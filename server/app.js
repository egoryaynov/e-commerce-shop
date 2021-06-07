require('dotenv').config({path: './config.env'})
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error.middleware')

connectDB()

app.use(express.json())

// STATIC MIDDLEWARE
app.use('/uploads/images', express.static(__dirname + '/uploads/images'))

// API ENDPOINTS
const getUrl = (endpoint) => {
    return `/api/v1/${endpoint}`
}

app.use(getUrl('auth'), require('./routes/auth.route'))
app.use(getUrl('address'), require('./routes/address.route'))
app.use(getUrl('category'), require('./routes/category.route'))
app.use(getUrl('product'), require('./routes/product.route'))

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`[Server]: Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`[Server]: Logged error: ${err}`)
    server.close(() => process.exit(1))
})