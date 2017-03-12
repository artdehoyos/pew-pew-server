const ws = require('ws');
const uuid = require('node-uuid');
const msgTypes = require('../common/message-types');

const port = process.env.PORT || 3000
const server = 
    new ws.Server({port: port}, () => {
        console.log(`server listening on port ${port}.`)
    })
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
            console.log(data);
        });
    });