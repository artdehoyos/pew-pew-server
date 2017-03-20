const uuid = require('node-uuid');
const msgTypes = require('../common/MessageTypes');
const ws = require('ws');

class SocketManager{
    constructor(gameServer){
        this.gameServer = gameServer;
        this.ws = require('ws');
        this.port = process.env.PORT || 3000;
        this.server = new ws.Server(
            {port: this.port},
            () => {console.log(`Game server listening on port ${this.port}`)}
        )
        .on('connection', (client)=>{
            console.log('Client connected');
            client.send(JSON.stringify(
                {
                    "message": "Hello.",
                    "id": uuid.v4(),
                    "type": msgTypes.server.WELCOME
                }
            ));
            client.on('message', (json) => {
                let data = JSON.parse(json);

                if(data.type === msgTypes.client.INPUT){
                    gameServer.handleInput(data, client);
                }
            });
        });
    }
}

module.exports = SocketManager;