
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from  .documents import EventDocument

class EventDocumentSerializer(DocumentSerializer):

    class Meta:
        document = EventDocument
        fields = ['id', 'title', 'description','location', 'start_time','end_time','is_public']
        read_only_fields = ['id', 'organizer', 'created_at', 'updated_at']