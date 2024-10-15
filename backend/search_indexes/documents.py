from django_elasticsearch_dsl import Document, Index, fields
from django_elasticsearch_dsl.registries import registry
from events.models import Event

event_index = Index('events')

@event_index.doc_type
class EventDocument(Document):
    id = fields.IntegerField(attr='id')
    title = fields.TextField(attr='title', fields={
        'keyword': fields.KeywordField(), 
        'fuzzy': fields.TextField() 
    })
    description = fields.TextField(attr='description', fields={
        'keyword': fields.KeywordField(), 
        'fuzzy': fields.TextField()
    })
    location = fields.GeoPointField() 
    start_time = fields.DateField()
    end_time = fields.DateField()
    created_at = fields.DateField()
    updated_at = fields.DateField()
    is_public = fields.BooleanField()
    organizer = fields.ObjectField()

    class Django:
        model = Event
