require('dotenv').config({path: '././config.env'})
const connectDB = require('../../config/db')

const Order = require('../../models/Order')

const io = require("socket.io-client")

connectDB('DeliveryService').then(() => {
    const socket = io(process.env.DELIVERY_WEBSOCKET_URL, {
        reconnection: true
    })

    // stages: 1 - paid, 2 - picked, 3 - delivered (last stage in delivery service), 4 - received

    const stages = ['paid', 'picked', 'delivered']
    const emitChangeStatus = (order) => {
        const interval = setInterval(() => {
            const newStatusName = stages[stages.indexOf(order.status) + 1]

            socket.emit('change_status', {orderId: order._id, status: newStatusName})

            order.status = newStatusName

            if (newStatusName === 'delivered') {
                clearInterval(interval)
            }
        }, 5000)
    }

    socket.on('connect', async function () {
        const orders = await Order.find({finished: false})

        // Handle prev unfinished orders
        if (orders && orders.length > 0) {
            orders.forEach(order => emitChangeStatus(order))
        }
    })

    socket.on('new_order', (order) => {
        emitChangeStatus(order)
    })
})