const ErrorResponse = require('../utils/ErrorResponse')
const Address = require('../models/Address')

exports.setAddress = async (req, res, next) => {
    const address = req.body
    const full = `${address.street}, ${address.houseNumber}, ${address.apartmentNumber}, ${address.city}, ${address.country}, ${address.postcode}`

    try {
        const user = req.user

        await Address.create({
            user: user._id, ...address, full
        }, async (err, newAddress) => {
            if (err) {
                next(new ErrorResponse('Incorrect request body', 400))
            }

            user.addresses.push(newAddress._id)

            await user.save()
        })

        res.status(200).json({
            success: true,
            address
        })
    } catch (error) {
        next(error)
    }
}