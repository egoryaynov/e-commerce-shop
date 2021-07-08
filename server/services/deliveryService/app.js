require('dotenv').config({path: '././config.env'})
const connectDB = require('../../config/db')

const Order = require('../../models/Order')

const io = require("socket.io-client")

const generateTimeToChangeStatus = () => {
    return Math.round(Math.random() * 5 + 1) * 60 * 1000
}

connectDB('DeliveryService').then(() => {
    const socket = io(process.env.DELIVERY_WEBSOCKET_URL, {
        reconnection: true
    })

    // stages: 1 - paid, 2 - picked, 3 - delivered (last stage in delivery service), 4 - received

    const stages = ['paid', 'picked', 'delivered']

    socket.on('connect', async function () {
        const orders = await Order.find({finished: false})

        orders.forEach(order => {
            const interval = setInterval(() => {
                const newStatusName = stages[stages.indexOf(order.status) + 1]

                socket.emit('change_status', {orderId: order._id, status: newStatusName})

                if (newStatusName === 'delivered') clearInterval(interval)
            }, generateTimeToChangeStatus())
        })

        // socket.on('hello', function (data) {
        //     console.log('message from the server:', data);
        //     socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
        // });

        socket.on('new_order', (data) => {
            console.log('NEW ORDER IN DELIVERY', data)
        })
    })
})