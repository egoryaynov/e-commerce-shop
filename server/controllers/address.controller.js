const ErrorResponse = require('../utils/ErrorResponse')
const Address = require('../models/Address')

exports.createAddress = async (req, res, next) => {
    const address = req.body
    const full = `${address.street}, ${address.houseNumber}, ${address.apartmentNumber}, ${address.city}, ${address.country}, ${address.postcode}`

    try {
        const user = req.user

        await Address.create({
            user: user._id, ...address, full
        }, async (err, newAddress) => {
            if (err) {
                return next(new ErrorResponse('Incorrect request body', 400))
            }

            user.addresses.push(newAddress._id)

            await user.save()

            return res.status(200).json({
                success: true,
                address: newAddress
            })
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteAddress = async (req, res, next) => {
    const addressId = req.body.addressId
    const user = req.user

    try {
        await Address.findOne({
            _id: addressId,
            user: user._id
        }, async (err, doc) => {
            if (!doc || err) {
                return next(new ErrorResponse('Address not found', 404))
            }

            user.addresses = user.addresses.filter(address => {
                return !address.equals(addressId)
            })

            await user.save(async (err) => {
                if (!err) {
                    await doc.deleteOne()

                    return res.status(200).json({
                        success: true,
                        user
                    })
                }

                return next(new ErrorResponse('Server Error on delete address', 500))
            })
        })
    } catch (error) {
        return next(error)
    }
}