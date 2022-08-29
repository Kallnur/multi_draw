const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss()
const cors = require('cors') 
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 8008

app.use(cors())
app.use(express.json())

app.ws('/', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch(msg.method){
            case 'CONNECTION': {
                connectionHandler(ws, msg)
                break
            }
            case 'DRAW': {
                multiConnection(ws, msg)
                break
            }
        }
        // console.log(msg);
    })
})


app.post('/image', (req, res) => {
    console.log(req.query);
    try {
        if(req.query){
            const data = req.body.img.replace('data:image/png;base64,', '')
            fs.writeFileSync(path.resolve(__dirname, `files`, `${req.query.id}.jpg`), data, 'base64')
            return res.status(200).json({message: 'YE'})
        }
    } catch (e){
        console.log(e);
        return res.status
    }
})

app.get('/image', (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = `data:image/png;base64,` + file.toString('base64')
        res.json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    multiConnection(ws, msg)
}

const multiConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
            client.send(JSON.stringify(msg))
        }
    })
}