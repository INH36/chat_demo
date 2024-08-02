const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const router = express.Router();


// 用户
const userdata = [
    {
        userid: 100001,
        username: '测试用户1'
    },
    {
        userid: 100002,
        username: '测试用户2'
    }
]


let index = 0
// 两个用户
router.post('/login', (req, res) => {
    const data = req.body;
    console.log(data)
    if (index < 0 || index >= userdata.length) {
        res.send({
            code: 503,
            msg: '人满了，就两个',
            data: null
        })
    } else {
        console.log(userdata[index])
        res.send({
            code: 200,
            msg: '登录成功',
            data: userdata[index++]
        })
    }
})


// webstocket服务器设置
const server = http.createServer();
const wss = new WebSocket.Server({server});

// 储存客户机
const chilt = new Map()

let t = 0
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.clientId = userdata[t].userid
    chilt.set(t++, ws)
    ws.on('message', (message) => {
        const data = JSON.parse(message)
        chilt.forEach((value, key) => {
            if (value.clientId === data.acceptid) {
                console.log(value.clientId)
                value.send(JSON.stringify(data))
            }
        })
    })
    ws.on('close', () => {
        console.log('Client disconnected');
    });
})

module.exports = { router, server};