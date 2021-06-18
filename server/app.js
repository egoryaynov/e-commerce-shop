require('dotenv').config({path: './config.env'})
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error.middleware')

const cors = require('cors')
const deliveryServiceApp = express()
const http = require('http')
const deliveryServiceServer = http.createServer(deliveryServiceApp)
const {Server} = require("socket.io")
const io = new Server(deliveryServiceServer)

const startDeliveryService = async () => {
    io.on('connection', (socket) => {
        console.log('[DeliveryServer]: Client connected')
    })

    deliveryServiceApp.use(cors({origin: 'http://127.0.0.1'}))
    deliveryServiceApp.set('socketio', io)

    deliveryServiceApp.use('/', require('./routes/deliveryService.route'))

    deliveryServiceServer.listen(process.env.DELIVERY_PORT, () => {
        console.log('[DeliveryServer]: listening on port ' + process.env.DELIVERY_PORT);
    })
}

Promise.all(
    [
        startDeliveryService(),
        connectDB()
    ]
).then(() => {
    app.use(express.json())

    // STATIC MIDDLEWARE
    app.use('/uploads/images', express.static(__dirname + '/uploads/images'))

    // API ENDPOINTS
    const getEndpointUrl = (endpoint) => {
        return `/api/v1/${endpoint}`
    }

    app.use(getEndpointUrl('auth'), require('./routes/auth.route'))
    app.use(getEndpointUrl('address'), require('./routes/address.route'))
    app.use(getEndpointUrl('category'), require('./routes/category.route'))
    app.use(getEndpointUrl('product'), require('./routes/product.route'))
    app.use(getEndpointUrl('order'), require('./routes/order.route'))

    // error handler
    app.use(errorHandler)

    const PORT = process.env.PORT || 5000
    const server = app.listen(PORT, () => console.log(`[Server]: Server running on port ${PORT}`))

    process.on('unhandledRejection', (err, promise) => {
        console.log(`[Server]: Logged error: ${err}`)
        server.close(() => process.exit(1))
    })
})