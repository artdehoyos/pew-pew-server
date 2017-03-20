class GameServer {
    constructor(){
        this.socketManager = require('./SocketManager')(this);
    }

    run(){
        process.nextTick(this.doGameLoop)
    }

    doGameLoop(){
        this.updateState();
        this.updateClients();
        process.nextTick(this.doGameLoop);
    }
    handleInput(data, client){
        console.log(`Client: ${data.client}, Keys: ${data.keys}`);
    }
}

module.exports = GameServer;