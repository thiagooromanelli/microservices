from flask import render_template
from flask_socketio import SocketIO, emit
import connexion
from flask_cors import CORS
import logging 

app = connexion.App(__name__, specification_dir='./')
logging.basicConfig(level=logging.DEBUG)

app.add_api('swagger.yml')
CORS(app.app,resources=r'/api/*',methods=['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'])
socketio = SocketIO(app.app)

@app.route('/')
def home():
    return render_template('serviceDesk.html')

def start_flask_server():
    # reloader false to use flask in a thread
    socketio.run(app.app, host='0.0.0.0', port=5002, debug=True, use_reloader=False)

if __name__ == '__main__':
    start_flask_server()




