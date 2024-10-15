from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.dateparse import parse_datetime
from django_elasticsearch_dsl.search import Search
from .documents import EventDocument
from .serializers import EventDocumentSerializer

class EventViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Existing logic for fetching events from Elasticsearch
        search_query = request.GET.get('search', '')
        is_public = request.GET.get('is_public', None)
        date = request.GET.get('date', None)
        lat = request.GET.get('lat', None)
        lon = request.GET.get('lon', None)

        search = EventDocument.search()

        if search_query:
            search = search.query(
                "bool",
                should=[
                    {"multi_match": {"query": search_query, "fields": ["title^3", "description", "description.keyword"], "type": "phrase"}},
                    {"multi_match": {"query": search_query, "fields": ["title^3", "description"], "fuzziness": "AUTO"}}
                ],
                minimum_should_match=1
            )


        if is_public is not None:
            search = search.filter("term", is_public=(is_public.lower() == 'true'))

        if date:
            date_parsed = parse_datetime(date)
            if date_parsed:
                search = search.filter('range', start_time={'lte': date_parsed}).filter('range', end_time={'gte': date_parsed})

        if lat and lon:
            try:
                lat, lon = float(lat), float(lon)
                search = search.query('geo_distance', distance='8km', location={'lat': lat, 'lon': lon})
            except ValueError:
                return Response({"error": "Invalid latitude or longitude"}, status=400)

        # Execute search and return results
        response = search.execute()
        # print(response)
        for i in response:
            print(i)
        results = [hit.to_dict() for hit in response]

        # Serialize results
        # print(results)
        serializer = EventDocumentSerializer(response, many=True)
        return Response(serializer.data)
