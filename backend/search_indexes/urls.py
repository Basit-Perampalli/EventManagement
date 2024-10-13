from django.urls import include,re_path
from rest_framework.routers import DefaultRouter

from .views import EventViewSet

router = DefaultRouter()
books = router.register(r'events',
                        EventViewSet,
                        basename='search_events')

urlpatterns = [
    re_path(r'^', include(router.urls)),
]