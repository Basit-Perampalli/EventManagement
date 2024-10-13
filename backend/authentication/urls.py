
from django.urls import path
from .views import register, login
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("refreshtoken/", TokenRefreshView.as_view(), name="refresh_token"),
]
