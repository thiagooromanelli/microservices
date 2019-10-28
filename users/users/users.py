from datetime import datetime
from flask import jsonify, make_response, abort
from kafka import KafkaConsumer, KafkaProducer
from kafka.errors import KafkaError
import json, os

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/") # Local
db = client.users

def watched_movie(login, movie_name):
    json_to_send = {}
    try:
        topico_to_send = "movies"
        broker = "localhost:9092" 
        producer = KafkaProducer(bootstrap_servers=[broker],value_serializer=lambda m: json.dumps(m).encode('ascii'))
        json_to_send["type"] = "watched"
        json_to_send["payload_movies"] = {
            "login": login,
            "movie_name": movie_name
        }
        future = producer.send(topico_to_send, json_to_send)
        record_metadata = future.get(timeout=10)
        
    except Exception as e:
        # Decide what to do if produce request failed...
        print(repr(e))
        abort(
            406,
            "Erro ao enviara msg pro Kafka: "+repr(e),
        )

def liked_movie(login, movie_name):
    json_to_send = {}
    try:
        topico_to_send = "movies"
        broker = "localhost:9092" 
        producer = KafkaProducer(bootstrap_servers=[broker],value_serializer=lambda m: json.dumps(m).encode('ascii'))
        json_to_send["type"] = "liked"
        json_to_send["payload_movies"] = {
            "login": login,
            "movie_name": movie_name
        }
        future = producer.send(topico_to_send, json_to_send)
        record_metadata = future.get(timeout=10)
        
    except Exception as e:
        # Decide what to do if produce request failed...
        print(repr(e))
        abort(
            406,
            "Erro ao enviara msg pro Kafka: "+repr(e),
        )

def to_watch_movie(login, movie_name):
    json_to_send = {}
    try:
        topico_to_send = "movies"
        broker = "localhost:9092" 
        producer = KafkaProducer(bootstrap_servers=[broker],value_serializer=lambda m: json.dumps(m).encode('ascii'))
        json_to_send["type"] = "to_watch"
        json_to_send["payload_movies"] = {
            "login": login,
            "movie_name": movie_name
        }
        future = producer.send(topico_to_send, json_to_send)
        record_metadata = future.get(timeout=10)
        
    except Exception as e:
        # Decide what to do if produce request failed...
        print(repr(e))
        abort(
            406,
            "Erro ao enviara msg pro Kafka: "+repr(e),
        )

def get_dict_from_mongodb():
    itens_db = db.users.find()
    USERS = {}
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente 
            item = dict(i)
            USERS[item["login"]] = (i)
    return USERS

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def read_all():
    USERS = get_dict_from_mongodb()
    dict_users = [USERS[key] for key in sorted(USERS.keys())]
    users = jsonify(dict_users)
    qtd = len(dict_users)
    content_range = "users 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    users.headers['Access-Control-Allow-Origin'] = '*'
    users.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    users.headers['Content-Range'] = content_range
    return users


def read_one(login):
    USERS = get_dict_from_mongodb()
    if login in USERS:
        user = USERS.get(login)
    else:
        abort(
            404, "Usuario com login '{login}' nao encontrado".format(login=login)
        )
    return user

def read_watched(login):
    USERS = get_dict_from_mongodb()
    if login in USERS:
        user = USERS.get(login)
    else:
        abort(
            404, "Usuario com login '{login}' nao encontrado".format(login=login)
        )
    return user["watched"]

    read_to_watch_movies

def read_to_watch_movies(login):
    USERS = get_dict_from_mongodb()
    if login in USERS:
        user = USERS.get(login)
    else:
        abort(
            404, "Usuario com login '{login}' nao encontrado".format(login=login)
        )
    return user["to_watch"]

def read_liked(login):
    USERS = get_dict_from_mongodb()
    if login in USERS:
        user = USERS.get(login)
    else:
        abort(
            404, "Usuario com login '{login}' nao encontrado".format(login=login)
        )
    return user["liked"]


def create(user):
    login = user.get("login", None)
    password = user.get("password", None)
    name = user.get("name", None)
    USERS = get_dict_from_mongodb()
    if name not in USERS and name is not None:
        item = {
            "login": login,
            "password": password,
            "name": name,
            "liked": [],
            "to_watch": [],
            "watched": [],
            "timestamp": get_timestamp(),
        }
        db.users.insert_one(item)
        return make_response(
            "{login} criado com sucesso".format(login=login), 201
        )
    else:
        abort(
            406,
            "Usuario com login '{login}' ja existe".format(login=login),
        )


def update_all(login, user):
    query = { "login": login }
    update = { "$set": {
            "login": user.get("login", None),
            "password": user.get("password", None),
            "name": user.get("name", None),
            "liked": [],
            "to_watch": [],
            "watched": [],
            "timestamp": get_timestamp(), } 
        }
    USERS = get_dict_from_mongodb()

    if login in USERS:
        db.users.update_one(query, update)
        USERS = get_dict_from_mongodb()
        return USERS[login]
    else:
        abort(
            404, "Usuario com login '{login}' nao encontrado".format(login=login)
        )

def update_watched(login, movie):
    query = { "login": login }
    update = { 
        "$set":{
            "timestamp": get_timestamp(),
        },
        "$addToSet":{
            "watched": movie
        }             
    }
    USERS = get_dict_from_mongodb()
    if login in USERS:
        for item in USERS[login]["watched"]:
            if item["movie_name"] == movie:
                flag = True
        if flag == False:
            db.users.update_one(query, update)
            USERS = get_dict_from_mongodb()
        else:
            pass

def update_liked(login, movie):
    flag = False
    query = { "login": login }
    update = { 
        "$set":{
            "timestamp": get_timestamp(),
        },
        "$addToSet":{
            "liked": movie
        }             
    }
    USERS = get_dict_from_mongodb()
    if login in USERS:
        for item in USERS[login]["liked"]:
            if item["movie_name"] == movie:
                flag = True
        if flag == False:
            db.users.update_one(query, update)
            USERS = get_dict_from_mongodb()
        else:
            pass

def update_to_watch_movies(login, movie):
    flag = False
    query = { "login": login }
    update = { 
        "$set":{
            "timestamp": get_timestamp(),
        },
        "$addToSet":{
            "to_watch": movie
        }             
    }
    USERS = get_dict_from_mongodb()
    if login in USERS:
        for item in USERS[login]["to_watch"]:
            if item["movie_name"] == movie:
                flag = True
        if flag == False:
            db.users.update_one(query, update)
            USERS = get_dict_from_mongodb()
        else:
            pass

def delete(login):
    query = { "login": login }
    USERS = get_dict_from_mongodb()
    if login in USERS:
        db.users.delete_one(query)
        return make_response(
            "'{login}' deletado com sucesso".format(login=login), 200
        )
    else:
        abort(
            404, "Usuario com login '{login}' nao encontrado".format(login=login)
        )


