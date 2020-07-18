from django.urls import path
from .views import SpotipyAPI


urlpatterns = [
    path('api/spotify/', SpotipyAPI.as_view(), name="spotify")
]