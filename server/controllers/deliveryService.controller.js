const Order = require('../models/Order')

module.exports.sendOrder = async (req, res, next) => {
    const io = req.app.get('socketio')

    // io.emit('hello', {as: 'as'})
    try {
        const wasSent = await io.emit('new_order', req.body.order)

        if (wasSent) {
            return res.status(200).json({
                success: true
            })
        }

        res.status(500).json({
            success: false
        })
    } catch (error) {
        next(error)
    }
}

module.exports.changeOrderStatus = async (data) => {
    const {orderId, status} = data

    await Order.findByIdAndUpdate(orderId, {status})

    if (status === 'delivered') {
        await Order.findByIdAndUpdate(orderId, {finished: true})
    }
}