# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import tmdbsimple as tmdb
import os

tmdb.API_KEY = os.environ.get('TMDB_API_KEY')


def get_seasons(showid: int) -> range:
    showinfo = tmdb.TV(showid)
    response = showinfo.info()
    seasons = range(1, response['number_of_seasons'] + 1)
    return seasons


def get_main_cast(showid: int) -> list:
    showinfo = tmdb.TV(showid)
    response = showinfo.credits()
    return response['cast']


def get_guest_stars(showid, seasons: range) -> list:
    guest_stars = []
    for i in seasons:
        seasoninfo = tmdb.TV_Seasons(showid, i)
        response = seasoninfo.info()
        season_stars = [show['guest_stars'] for show in response['episodes'] if len(show['guest_stars']) > 0]
        [guest_stars.extend(star) for star in season_stars]

    return guest_stars


def get_full_cast(showid: int) -> list:
    seasons = get_seasons(showid)
    main_cast = get_main_cast(showid)
    guest_stars = get_guest_stars(showid, seasons)

    main_cast.extend(guest_stars)

    return main_cast


def common_actor_ids(show_one_cast: list, show_two_cast: list) -> list:
    ids_one = {actor['id'] for actor in show_one_cast}
    ids_two = {actor['id'] for actor in show_two_cast}

    common_ids = ids_one.intersection(ids_two)

    return list(common_ids)


def get_actor_show_pairs(show_one_cast: list, show_two_cast: list, common_ids: list) -> list:
    actors = []
    for actor_id in common_ids:
        role_1 = next(actor for actor in show_one_cast if actor['id'] == actor_id)
        actor_data = {
            'name': role_1['name'],
            'id': role_1['id'],
            'profile_path': role_1['profile_path'],
            'character_one': role_1['character']
        }
        role_2 = next(actor for actor in show_two_cast if actor['id'] == actor_id)
        actor_data['character_two'] = role_2['character']
        actors.append(actor_data)
    return actors


def get_common_actors(showid_one: int, showid_two: int):
    show_one_cast = get_full_cast(showid_one)
    show_two_cast = get_full_cast(showid_two)

    common_ids = common_actor_ids(show_one_cast, show_two_cast)
    common_actors = get_actor_show_pairs(show_one_cast, show_two_cast, common_ids)

    return common_actors


@api_view()
def common_actors_view(response):
    if response.method == 'GET':
        try:
            showid_one = int(response.GET.get('show1'))
            showid_two = int(response.GET.get('show2'))
        except ValueError:
            return Response({'error': 'Show IDs must be integers'}, status.HTTP_400_BAD_REQUEST)

        if showid_one == showid_two:
            return Response({'error': 'Show IDs must be different'}, status.HTTP_400_BAD_REQUEST)

        common_actors = get_common_actors(showid_one, showid_two)

        return Response(common_actors, status.HTTP_200_OK)

