from channels.generic.websocket import AsyncWebsocketConsumer
import json

class EventConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Add this connection to the "events_group"
        await self.channel_layer.group_add('events_group', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Remove connection from the "events_group"
        await self.channel_layer.group_discard('events_group', self.channel_name)

    async def send_event_update(self, event):
        # Send the event data to WebSocket client
        await self.send(text_data=json.dumps({
            'data': event['data'],
            'event_type': event['event_type']
        }))
