const ErrorResponse = require('../utils/ErrorResponse')
const {Address} = require('../models/Address')
const {getFullAddress} = require('../models/Address')
const User = require('../models/User')

exports.createAddress = async (req, res, next) => {
    const address = req.body
    const full = getFullAddress(address)

    try {
        const user = req.user

        await Address.create({
            user: user._id, ...address, full
        }, async (err, newAddress) => {
            if (err) {
                return next(new ErrorResponse('Incorrect request body', 400))
            }

            user.addresses.push(newAddress._id)

            await user.save(async err => {
                if (!err) {
                    await sendPopulatedAddresses(user._id, res)
                } else {
                    return next(new ErrorResponse('Server Error on add address', 500))
                }
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

                    await sendPopulatedAddresses(user._id, res)
                } else {
                    return next(new ErrorResponse('Server Error on delete address', 500))
                }
            })
        })
    } catch (error) {
        return next(error)
    }
}

exports.updateAddress = async (req, res, next) => {
    const addressId = req.body.addressId
    const updatedAddress = req.body.address
    const user = req.user

    try {
        await Address.findOne({
            _id: addressId,
            user: user._id
        }, async (err, doc) => {
            if (!doc || err) {
                return next(new ErrorResponse('Address not found', 404))
            }

            Object.keys(updatedAddress).forEach(field => {
                if (field !== '_id' && field !== 'user') {
                    doc[field] = updatedAddress[field]
                }
            })

            doc.full = getFullAddress(updatedAddress)

            await doc.save(async (err) => {
                if (!err) {
                    await sendPopulatedAddresses(user._id, res)
                } else {
                    return next(new ErrorResponse('Server Error on update address', 500))
                }
            })
        })
    } catch (error) {
        return next(error)
    }
}

const sendPopulatedAddresses = async function (userId, res) {
    const userPopulated = await User.findById(userId)
        .populate('addresses')

    return res.status(200).json({
        success: true,
        addresses: userPopulated.addresses
    })
}