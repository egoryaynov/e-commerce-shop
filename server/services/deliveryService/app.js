require('dotenv').config({path: '././config.env'})

const io = require("socket.io-client")

// todo сделать сохранение всех заказов в файл (в таблице)

// time to stage Math.round(Math.random() * 5 + 1)

// 1. Connect to websocket on server
const socket = io(process.env.DELIVERY_WEBSOCKET_URL, {
    reconnection: true
})

socket.on('connect', function () {
    socket.on('hello', function (data) {
        console.log('message from the server:', data);
        socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
    });
});

// 2. Write handlers for events


// 4. Error handling