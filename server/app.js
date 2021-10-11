require('dotenv').config({path: './config.env'})
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error.middleware')

const startDeliveryService = require('./config/startDeliveryService')

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./swagger.json')

// API DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
    const getEndpointUrlV1 = (endpoint) => {
        return `/api/v1/${endpoint}`
    }

    app.use(getEndpointUrlV1('auth'), require('./routes/auth.route'))
    app.use(getEndpointUrlV1('address'), require('./routes/address.route'))
    app.use(getEndpointUrlV1('category'), require('./routes/category.route'))
    app.use(getEndpointUrlV1('product'), require('./routes/product.route'))
    app.use(getEndpointUrlV1('order'), require('./routes/order.route'))

    // error handler
    app.use(errorHandler)

    const PORT = process.env.PORT || 5000
    const server = app.listen(PORT, () => console.log(`[Server]: Server running on port ${PORT}`))

    process.on('unhandledRejection', (err) => {
        console.log(`[Server]: Logged error: ${err}`)
        server.close(() => process.exit(1))
    })
})