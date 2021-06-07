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


    // 3. Write handlers for events


    // 4. Error handling


    // 5. Implement stop()
}