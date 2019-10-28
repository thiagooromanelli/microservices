from datetime import datetime
from flask import jsonify, make_response, abort
from kafka import KafkaProducer
from kafka.errors import KafkaError
import json, os

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/") # Local
db = client.movies

def get_dict_from_mongodb():
    itens_db = db.movies.find()
    MOVIES = {}
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente 
            item = dict(i)
            MOVIES[item["movie_name"]] = (i)
    return MOVIES

def get_dict_by_genre(genre):
    itens_db = db.movies.find({"genre": genre})
    MOVIES_BY_GENRE = {}
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente 
            item = dict(i)
            MOVIES_BY_GENRE[item["movie_name"]] = i
    return MOVIES_BY_GENRE

def get_dict_by_keyword(keyword):
    itens_db = db.movies.find({"keywords": {"$in": [keyword]}})
    MOVIES_BY_KEYWORD = {}
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente 
            item = dict(i)
            MOVIES_BY_KEYWORD[item["movie_name"]] = i
    return MOVIES_BY_KEYWORD

def get_dict_by_most_viewed(genre):
    itens_db = db.movies.aggregate([
        {"$match": {"genre":genre}},
        {"$sort":{"views":-1}},
        {"$limit": 5}
        ])
    MOVIES_BY_MOST_VIEWED = []
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente
            item = dict(i)
            MOVIES_BY_MOST_VIEWED.append(item)
    return MOVIES_BY_MOST_VIEWED

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def read_all():
    MOVIES = get_dict_from_mongodb()
    dict_movies = [MOVIES[key] for key in sorted(MOVIES.keys())]
    movies = jsonify(dict_movies)
    qtd = len(dict_movies)
    content_range = "movies 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    movies.headers['Access-Control-Allow-Origin'] = '*'
    movies.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    movies.headers['Content-Range'] = content_range
    return movies

def read_all_by_genre(genre):
    MOVIES = get_dict_by_genre(genre)
    dict_movies = [MOVIES[key] for key in sorted(MOVIES.keys())]
    movies = jsonify(dict_movies)
    qtd = len(dict_movies)
    content_range = "movies 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    movies.headers['Access-Control-Allow-Origin'] = '*'
    movies.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    movies.headers['Content-Range'] = content_range
    return movies

def read_all_by_keyword(keyword):
    MOVIES = get_dict_by_keyword(keyword)
    dict_movies = [MOVIES[key] for key in sorted(MOVIES.keys())]
    movies = jsonify(dict_movies)
    qtd = len(dict_movies)
    content_range = "movies 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    movies.headers['Access-Control-Allow-Origin'] = '*'
    movies.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    movies.headers['Content-Range'] = content_range
    return movies 

def read_all_by_most_viewed(genre):
    MOVIES = get_dict_by_most_viewed(genre)
    movies = jsonify(MOVIES)
    qtd = len(MOVIES)
    content_range = "movies 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    movies.headers['Access-Control-Allow-Origin'] = '*'
    movies.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    movies.headers['Content-Range'] = content_range
    return movies


def read_one(movie_name):
    MOVIES = get_dict_from_mongodb()
    if movie_name in MOVIES:
        movie = MOVIES.get(movie_name)
    else:
        abort(
            404, "Filme '{movie_name}' nao encontrado".format(movie_name=movie_name)
        )
    return movie

def read_movie_details(movie_name): 
    MOVIES = get_dict_from_mongodb()
    if movie_name in MOVIES:
        movie = MOVIES.get(movie_name)
    else:
        abort(
            404, "Filme '{movie_name}' nao encontrado".format(movie_name=movie_name)
        )
    return movie['details']


def create(movie):
    movie_name = movie.get("movie_name", None)
    details = movie.get("details", None)
    genre = movie.get("genre", None)
    keywords = movie.get("keywords", None)
    MOVIES = get_dict_from_mongodb()
    if movie_name not in MOVIES and movie_name is not None:
        item = {
            "movie_name": movie_name,
            "details": details,
            "genre": genre,
            "views": 0,
            "keywords": keywords,
            "timestamp": get_timestamp(),
        }
        db.movies.insert_one(item)
        return make_response(
            "'{movie_name}' criado com sucesso".format(movie_name=movie_name), 201
        )
    else:
        abort(
            406,
            "Filme '{movie_name}' ja existe".format(movie_name=movie_name),
        )


def update(movie_name, movie):
    query = { "movie_name": movie_name }
    update = { "$set": {
            "movie_name": movie.get("movie_name"),
            "details": movie.get("details"),
            "genre": movie.get("genre"),
            "views": movie.get("views"),
            "keywords": movie.get("keywords"),
            "timestamp": get_timestamp(), } 
        }
    MOVIES = get_dict_from_mongodb()

    if movie_name in MOVIES:
        db.movies.update_one(query, update)
        MOVIES = get_dict_from_mongodb()
        return MOVIES[movie_name]
    else:
        abort(
            404, "Pessoa com sobrenome {movie_name} nao encontrada".format(movie_name=movie_name)
        )

def delete(movie_name):
    query = { "movie_name": movie_name }
    MOVIES = get_dict_from_mongodb()
    if movie_name in MOVIES:
        db.movies.delete_one(query)
        return make_response(
            "{movie_name} deletado com sucesso".format(movie_name=movie_name), 200
        )
    else:
        abort(
            404, "Pessoa com sobrenome {movie_name} nao encontrada".format(movie_name=movie_name)
        )

def update_views(movie_name):
    query = { "movie_name": movie_name }
    update = { 
        "$set":{
            "timestamp": get_timestamp(),
        },
        "$inc":{
            "views": 1
        }             
    }
    MOVIES = get_dict_from_mongodb()
    if movie_name in MOVIES:
        db.movies.update_one(query, update)
        MOVIES = get_dict_from_mongodb()


