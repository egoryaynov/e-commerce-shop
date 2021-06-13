// exports.createWSChannel = async (req, res, next) => {
//
// }

exports.sendOrders = async (req, res, next) => {
    const io = req.app.get('socketio')

    io.emit('hello', {as: 'as'})
}