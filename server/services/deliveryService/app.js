require('dotenv').config({path: '../../config.env'})
const express = require('express')
const app = express()

const io = require("socket.io-client")
const socket = io({
    autoConnect: true
});

module.exports.start = async () => {
    // 1. Get all orders from collection in MongoDB


    // 2. Connect to websocket on server
    const socket = io(process.env.DELIVERY_WEBSOCKET_URL, {
        reconnectionDelayMax: 10000,
        auth: {
            token: "123"
        },
        query: {
            "my-key": "my-value"
        }
    });

    // 3. Write handlers for events


    // 4. Error handling


    // 5. Implement stop()
}