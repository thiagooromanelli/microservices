from flask import render_template
from flask_socketio import SocketIO, emit
import connexion
from flask_cors import CORS
import logging 
from kafka import KafkaConsumer, KafkaProducer
from kafka.errors import KafkaError
import threading
import movies
import json, os

app = connexion.App(__name__, specification_dir='./')
logging.basicConfig(level=logging.DEBUG)

app.add_api('swagger.yml')
CORS(app.app,resources=r'/api/*',methods=['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'])
socketio = SocketIO(app.app)

@app.route('/')
def home():
    return render_template('movies.html')

def start_kafka_handler():
    topic_to_listen = "movies"
    topic_to_send = "users"
    broker = "0.0.0.0:9092" #"192.168.10.133:9092"
    consumer = KafkaConsumer(topic_to_listen, bootstrap_servers=[broker],value_deserializer=lambda m: json.loads(m.decode('ascii')))
    producer = KafkaProducer(bootstrap_servers=[broker],value_serializer=lambda m: json.dumps(m).encode('ascii'))

    for msg in consumer:
        json_to_send = {}
        if msg.value['type'] == "watched":
            # faz o update no numero de views do filme em questao e devolve o filme para o usuario
            movies.update_views(msg.value["payload_movies"]["movie_name"])
            json_to_send["type"] = "watched"
            json_to_send["payload_users"] = {}
            json_to_send["payload_users"]["login"] = msg.value["payload_movies"]["login"]
            json_to_send["payload_users"]["movie_watched"] = movies.read_one(msg.value['payload_movies']['movie_name'])
            future = producer.send(topic_to_send, json_to_send)
            record_metadata = future.get(timeout=10)

        if msg.value['type'] == "liked":
            json_to_send["type"] = "liked"
            json_to_send["payload_users"] = {}
            json_to_send["payload_users"]["login"] = msg.value["payload_movies"]["login"]
            json_to_send["payload_users"]["movie_liked"] = movies.read_one(msg.value['payload_movies']['movie_name'])
            future = producer.send(topic_to_send, json_to_send)
            record_metadata = future.get(timeout=10)

        if msg.value['type'] == "to_watch":
            json_to_send["type"] = "to_watch"
            json_to_send["payload_users"] = {}
            json_to_send["payload_users"]["login"] = msg.value["payload_movies"]["login"]
            json_to_send["payload_users"]["movie_to_watch"] = movies.read_one(msg.value['payload_movies']['movie_name'])
            future = producer.send(topic_to_send, json_to_send)
            record_metadata = future.get(timeout=10)
    if consumer is not None:
        consumer.close()

def start_flask_server():
    # reloader false to use flask in a thread
    socketio.run(app.app, host='0.0.0.0', port=5000, debug=True, use_reloader=False)

if __name__ == '__main__':
    t = threading.Thread(name='kafka', target=start_kafka_handler)
    w = threading.Thread(name='flask', target=start_flask_server)
    t.start()
    w.start()




