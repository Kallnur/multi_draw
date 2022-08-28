const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss()

const PORT = process.env.PORT || 8008

app.ws('/', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch(msg.method){
            case 'CONNECTION': {
                connectionHandler(ws, msg)
                break
            }
        }
        console.log(msg);
    })
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    multiConnection(ws, msg)
}

const multiConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
            client.send(`User ${msg.name} connected`)
        }
    })
}