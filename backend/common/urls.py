from django.urls import path
from .views import tmdb_common

app_name = 'common'

urlpatterns = [
    path('', tmdb_common, name='tmdb-common'),
]
