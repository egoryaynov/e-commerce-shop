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
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/address', require('./routes/address.route'))

// ADMIN ENDPOINTS
app.use('/api/category', require('./routes/category.route'))
app.use('/api/product', require('./routes/product.route'))

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged error: ${err}`)
    server.close(() => process.exit(1))
})