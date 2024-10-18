from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.JSONField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_public = models.BooleanField(default=True)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def event_data(self):
        """Utility function to structure event data for WebSocket."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat(),
            'is_public': self.is_public,
            # 'organizer': self.organizer.username,
            # 'created_at': self.created_at.isoformat(),
            # 'updated_at': self.updated_at.isoformat(),
        }

# Signals for broadcasting real-time updates via WebSocket

@receiver(post_save, sender=Event)
def send_event_update(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    event_data = instance.event_data()

    # Determine the type of event (create or update)
    event_type = 'create' if created else 'update'

    # Send data to the WebSocket group
    async_to_sync(channel_layer.group_send)(
        'events_group',  # Group name
        {
            'type': 'send_event_update',  # Method that will be called on the consumer
            'data': event_data,  # Event data
            'event_type': event_type  # Type of event (create or update)
        }
    )

@receiver(post_delete, sender=Event)
def send_event_delete(sender, instance, **kwargs):
    channel_layer = get_channel_layer()

    # Send a delete event to the WebSocket group
    async_to_sync(channel_layer.group_send)(
        'events_group',
        {
            'type': 'send_event_update',
            'data': {'id': instance.id},  # Only the ID is needed for deletion
            'event_type': 'delete'  # Specify that this is a delete operation
        }
    )
