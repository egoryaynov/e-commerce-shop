const ErrorResponse = require('../utils/ErrorResponse')
const Address = require('../models/Address')

exports.setAddress = async (req, res, next) => {
    const address = req.body
    const full = `${address.street}, ${address.houseNumber}, ${address.apartmentNumber}, ${address.city}, ${address.country}, ${address.postcode}`

    try {
        await Address.create({
            user: req.user._id, ...address, full
        })

        res.status(200).json({
            success: true,
            address
        })
    } catch (error) {
        next(error)
    }
}