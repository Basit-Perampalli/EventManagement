
from django.urls import path
from .views import create_event,list_organizer_events,update_event,delete_event,toggle_event_visibility,list_all_events

urlpatterns = [
    path("create/", create_event, name="create_event"),
    path("my/", list_organizer_events, name="list_organizer_events"),
    path("<int:pk>/update/", update_event, name="update_event"),
    path("<int:pk>/delete/", delete_event, name="delete_event"),
    path("<int:pk>/toggle/", toggle_event_visibility, name="toggle_event_visibility"),
    path("all/", list_all_events, name="all_event"),
]
