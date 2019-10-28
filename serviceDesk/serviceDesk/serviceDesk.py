from datetime import datetime
from flask import jsonify, make_response, abort

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/") # Local
db = client.ticket

def get_dict_from_mongodb():
    itens_db = db.ticket.find()
    TICKET = {}
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente 
            item = dict(i)
            TICKET[item["title"]] = (i)
    return TICKET

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def read_all():
    TICKET = get_dict_from_mongodb()
    dict_ticket = [TICKET[key] for key in sorted(TICKET.keys())]
    ticket = jsonify(dict_ticket)
    qtd = len(dict_ticket)
    content_range = "ticket 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    ticket.headers['Access-Control-Allow-Origin'] = '*'
    ticket.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    ticket.headers['Content-Range'] = content_range
    return ticket


def create(ticket):
    title = ticket.get("title", None)
    description = ticket.get("description", None)
    user = ticket.get("user", None)
    TICKET = get_dict_from_mongodb()
    if title not in TICKET and title is not None:
        item = {
            "title": title,
            "description": description,
            "user": user,
            "timestamp": get_timestamp(),
        }
        db.ticket.insert_one(item)
        return make_response(
            "Ticket aberto com sucesso", 201
        )
    else:
        abort(
            406,
            "Ticket existente"
        )

def update(title, ticket):
    query = { "title": title }
    update = { "$set": {
            "title": ticket.get("title"),
            "description": ticket.get("description"),
            "user":ticket.get("user"),
            "timestamp": get_timestamp(), } 
        }
    TICKET = get_dict_from_mongodb()

    if title in TICKET:
        db.ticket.update_one(query, update)
        TICKET = get_dict_from_mongodb()
        return TICKET[title]
    else:
        abort(
            404, "Ticket nao encontrado"
        )

def delete(title):
    query = { "title": title }
    TICKET = get_dict_from_mongodb()
    if title in TICKET:
        db.ticket.delete_one(query)
        return make_response(
            "Ticket deletado com sucesso", 200
        )
    else:
        abort(
            404, "Ticket nao encontrado"
        )
