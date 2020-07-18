from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

client_id = "c4d0de4b80194280923aa15881bb4c87"
client_secret = "1d11e4ead6b04369ad891c27b0b07c81"

class SpotipyAPI(APIView):
    def post(self, request, *arg, **kwarg):
        query = request.data.get('search', '')
        sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id, client_secret))
        if query is '':
            return Response("oooooooola")
        results = sp.search(q=query, limit=50)
        return Response(results, status=HTTP_200_OK)
