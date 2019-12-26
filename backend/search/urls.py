from django.urls import path

from .views import tmdb_search

app_name = 'search'
urlpatterns = [
    path('', tmdb_search, name='search-list')
]
