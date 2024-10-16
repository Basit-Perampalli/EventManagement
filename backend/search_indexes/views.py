from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.dateparse import parse_datetime
from django_elasticsearch_dsl.search import Search
from .documents import EventDocument
from .serializers import EventDocumentSerializer
from datetime import datetime


class EventViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Existing logic for fetching events from Elasticsearch
        event = request.GET.get('event', '')
        search_query = request.GET.get('search', '')
        is_public = request.GET.get('is_public', None)
        date = request.GET.get('date', None)
        lat = request.GET.get('lat', None)
        lon = request.GET.get('lon', None)

        search = EventDocument.search()
        # print(search_query)

        if event:
            if event == 'completed':
                print(event)
                d = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
                print(d)
                date_parsed = parse_datetime(d)
                print(date_parsed)
                if date_parsed:
                    search = search.filter('range', start_time={'lte': date_parsed})
            if event == 'upcoming':
                print(event)
                d = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
                print(d)
                date_parsed = parse_datetime(d)
                print(date_parsed)
                if date_parsed:
                    search = search.filter('range', start_time={'gt': date_parsed})

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
            print(parse_datetime)
            if date_parsed:
                search = search.filter('range', start_time={'lte': date_parsed}).filter('range', end_time={'gte': date_parsed})

        if lat and lon:
            try:
                lat, lon = float(lat), float(lon)
                search = search.query('geo_distance', distance='8km', location={'lat': lat, 'lon': lon})
            except ValueError:
                return Response({"error": "Invalid latitude or longitude"}, status=400)

        # Execute search and return results
        search = search[:100]
        response = search.execute()
        print(len(response))
        # for i in response:
        #     print(i)
        results = [hit.to_dict() for hit in response]

        # Serialize results
        # print(len(results))
        serializer = EventDocumentSerializer(results, many=True)
        # print(serializer.data)
        return Response(serializer.data)
