from django.urls import path
from .views import common_actors_view

app_name = 'common'

urlpatterns = [
    path('', common_actors_view, name='tmdb-common'),
]
