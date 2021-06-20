require('dotenv').config({path: '././config.env'})

const io = require("socket.io-client")

// сейвим заказы в json и при статусе доставлено удаляем из него заказ
// при запуске этого сервиса проверяем есть ли данные в json, если есть - обработать их

// time to stage Math.round(Math.random() * 5 + 1)

// Connect to websocket on server
const socket = io(process.env.DELIVERY_WEBSOCKET_URL, {
    reconnection: true
})

socket.on('connect', function () {
    // socket.on('hello', function (data) {
    //     console.log('message from the server:', data);
    //     socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
    // });

    socket.on('new_order', (data) => {
        console.log('NEW ORDER IN DELIVERY', data)
    })
})