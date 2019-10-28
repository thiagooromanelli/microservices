from flask import render_template
from flask_socketio import SocketIO, emit
import connexion
from flask_cors import CORS
import logging 
from kafka import KafkaConsumer, KafkaProducer
from kafka.errors import KafkaError
import threading
import users
import json, os

app = connexion.App(__name__, specification_dir='./')
logging.basicConfig(level=logging.DEBUG)

app.add_api('swagger.yml')
CORS(app.app,resources=r'/api/*',methods=['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'])
socketio = SocketIO(app.app)

@app.route('/')
def home():
    return render_template('users.html')

def start_kafka_handler():
    topic_to_listen = "users"
    topic_to_send = "movies"
    broker = "0.0.0.0:9092" #"192.168.10.133:9092"
    consumer = KafkaConsumer(topic_to_listen, bootstrap_servers=[broker],value_deserializer=lambda m: json.loads(m.decode('ascii')))
    producer = KafkaProducer(bootstrap_servers=[broker],value_serializer=lambda m: json.dumps(m).encode('ascii'))

    for msg in consumer:
        if msg.value['type'] == "watched":
            # faz o update no numero de views do filme em questao e devolve o filme para o usuario
            users.update_watched(msg.value["payload_users"]["login"],msg.value["payload_users"]["movie_watched"])
        if msg.value['type'] == "liked":
            # faz o update no numero de views do filme em questao e devolve o filme para o usuario
            users.update_liked(msg.value["payload_users"]["login"],msg.value["payload_users"]["movie_liked"])
        if msg.value['type'] == "to_watch":
            # faz o update no numero de views do filme em questao e devolve o filme para o usuario
            users.update_to_watch_movies(msg.value["payload_users"]["login"],msg.value["payload_users"]["movie_to_watch"])
    if consumer is not None:
        consumer.close()

def start_flask_server():
    # reloader false to use flask in a thread
    socketio.run(app.app, host='0.0.0.0', port=5001, debug=True, use_reloader=False)

if __name__ == '__main__':
    t = threading.Thread(name='kafka', target=start_kafka_handler)
    w = threading.Thread(name='flask', target=start_flask_server)
    t.start()
    w.start()




