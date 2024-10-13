from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
from .permissions import IsOrganizer 

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsOrganizer])  # Only authenticated organizers can create events
def create_event(request):
    data = request.data
    data['organizer'] = request.user.id

    serializer = EventSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_organizer_events(request):
    events = Event.objects.filter(organizer=request.user)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


#get event by id
# @api_view(['GET'])
# def get_event(request, pk):
#     try:
#         event = Event.objects.get(id=pk)

#         # Check if the event is private and if the user is not the organizer
#         if not event.is_public and event.organizer != request.user:
#             return Response({'error': 'You are not allowed to access this event'}, status=status.HTTP_403_FORBIDDEN)

#         serializer = EventSerializer(event)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except Event.DoesNotExist:
#         return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated,IsOrganizer])
def update_event(request, pk):
    try:
        event = Event.objects.get(id=pk)
        if event.organizer != request.user:
            return Response({'error': 'You are not allowed to update this event'}, status=status.HTTP_403_FORBIDDEN)
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated,IsOrganizer])
def delete_event(request, pk):
    try:
        event = Event.objects.get(id=pk)

        if event.organizer != request.user:
            return Response({'error': 'You are not allowed to delete this event'}, status=status.HTTP_403_FORBIDDEN)

        event.delete()
        return Response({'success': 'Event deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PATCH'])
@permission_classes([IsAuthenticated,IsOrganizer])
def toggle_event_visibility(request, pk):
    try:
        event = Event.objects.get(id=pk)

        if event.organizer != request.user:
            return Response({'error': 'You are not allowed to update this event'}, status=status.HTTP_403_FORBIDDEN)

        event.is_public = not event.is_public  # Toggle visibility
        event.save()
        return Response({'success': 'Event visibility updated'}, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_all_events(request):
    # Fetch all events, ordering by start_time with upcoming events first
    events = Event.objects.all().order_by('start_time')
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
