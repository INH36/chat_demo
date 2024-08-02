
const express = require('express');
const cors = require('cors');
//router
const { router , server} = require('./routes/chat');

const app = express();

app.use(cors());
app.use(express.json())
app.use('/chat', router);


app.listen(3000, 'localhost', ()=> {
    console.log('Server is running on http://localhost:3000')
})

server.listen(3005, ()=> {
    console.log('WebSocket server is running on http://localhost:3005')
})