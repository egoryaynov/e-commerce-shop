require('dotenv').config({path: './config.env'})
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error.middleware')

const startDeliveryService = require('./config/startDeliveryService')

Promise.all(
    [
        startDeliveryService(),
        connectDB()
    ]
).then(() => {
    app.use(express.json())

    // STATIC IMAGES MIDDLEWARE
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