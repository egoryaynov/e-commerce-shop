const io = require('socket.io-client')
// const express = require('express')
// const app = express()
//
// app.get('/', () => {
//     console.log('aaaaaaa')
// })

module.exports.start = async () => {
    const socket = io()

    socket.on('connect', () => {
        console.log('[DeliveryService]: connection established')
    })
}