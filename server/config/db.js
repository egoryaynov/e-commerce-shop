const mongoose = require('mongoose')

const connectDB = async (serverName = 'Server') => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }, err => {
        if (err) {
            throw new Error('Error on connect DB')
        } else {
            console.log(`[${serverName}]: MongoDB connected`)
        }
    })
}

module.exports = connectDB