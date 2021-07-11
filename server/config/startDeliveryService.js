const express = require('express')
const cors = require('cors')
const deliveryServiceApp = express()
const http = require('http')
const deliveryServiceServer = http.createServer(deliveryServiceApp)
const {Server} = require("socket.io")
const io = new Server(deliveryServiceServer)

const startDeliveryService = async () => {
    io.on('connection', (socket) => {
        console.log('[DeliveryServer]: Client connected')

        socket.on('change_status', (data) => {
            const {changeOrderStatus} = require('../controllers/deliveryService.controller')
            changeOrderStatus(data)
        })
    })

    deliveryServiceApp.use(cors({
        origin: 'http://127.0.0.1',
        credentials: true
    }))
    deliveryServiceApp.use(express.json())
    deliveryServiceApp.set('socketio', io)

    deliveryServiceApp.use('/', require('../routes/deliveryService.route'))

    deliveryServiceServer.listen(process.env.DELIVERY_PORT, () => {
        console.log('[DeliveryServer]: listening on port ' + process.env.DELIVERY_PORT)
    })
}

module.exports = startDeliveryService