require('dotenv').config({path: '././config.env'})

const io = require("socket.io-client")

// todo сделать сохранение всех заказов в файл (в таблице)
// 1. Get all orders from collection in MongoDB
// time to stage Math.round(Math.random() * 5 + 1)

// 2. Connect to websocket on server
const socket = io(process.env.DELIVERY_WEBSOCKET_URL, {
    reconnection: true
})

socket.on('connect', function () {
    socket.on('hello', function (data) {
        console.log('message from the server:', data);
        socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
    });
});

// 3. Write handlers for events


// 4. Error handling


// 5. Implement stop()