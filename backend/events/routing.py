from django.urls import path
from . import consumers

# This is where the WebSocket URL pattern is defined
websocket_urlpatterns = [
    path('ws/', consumers.EventConsumer.as_asgi()),
]
