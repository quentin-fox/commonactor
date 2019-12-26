# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import tmdbsimple as tmdb
import os
import urllib.parse

# Create your views here.

tmdb.API_KEY = os.environ.get('TMDB_API_KEY')


@api_view()
def tmdb_search(response):
    if response.method == 'GET':
        search = tmdb.Search()
        query = response.GET.get('q')
        cleanquery = urllib.parse.quote_plus(query, safe='')
        response = search.tv(query=cleanquery)
        if len(response['results']) > 0:
            return Response(response['results'])
        else:
            return Response({'error': 'No search results'}, status.HTTP_204_NO_CONTENT)
