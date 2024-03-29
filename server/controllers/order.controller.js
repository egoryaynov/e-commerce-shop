const ErrorResponse = require("../utils/ErrorResponse")
const Order = require('../models/Order')
const axios = require("axios");
const { Product } = require("../models/Product");
const ObjectID = require('mongodb').ObjectID;

exports.payOrder = async (req, res, next) => {
    const {address, products} = req.body
    const user = req.user

    if (!address || !products || products.length === 0) {
        return next(new ErrorResponse('Incorrect values of order', 400))
    }

    try {
        const createOrder = async () => {
            const addressId = address._id

            const productIDs = products.map(item => ObjectID(item.product._id))
            
            const order = new Order({
                status: 'paid',
                products: products.map(item => ({ product: item.product._id, color: item.color })),
                address: addressId,
                date: Date.now()
            })

            user.orders.push(order._id)
            await axios
                .post(`http://127.0.0.1:${process.env.DELIVERY_PORT}`, {
                    order,
                    addressId
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .catch(error => {
                    return next(new ErrorResponse('Error on send order to delivery', 500))
                })
                
            // SAVING ORDER
            await Product.updateMany({_id: {$in: productIDs}}, {$inc: {buyCount: 1}})

            const savedOrder = await order.save()
            await user.save()

            return savedOrder
        }

        const orderId = (await createOrder())._id
        const order = await Order.findById(orderId)
            .populate({
                path: 'address',
                populate: {path: 'user'}
            })
            .populate({
                path: 'products',
                populate: {path: 'product'}
            })

        res.status(201).json({
            success: true,
            order
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
            .populate({
                path: 'products',
                populate: {path: 'category'}
            })
            .populate({
                path: 'address',
                populate: {
                    path: 'user',
                    select: '-addresses -orders'
                }
            })

        if (orders) {
            return res.status(200).json({
                success: true,
                orders
            })
        }

        return res.status(400).json({
            success: false,
            message: 'Bad request'
        })
    } catch (e) {
        next(e)
    }
}

exports.orderReceived = async (req, res, next) => {
    const {orderId} = req.body

    try {
        const order = await Order.findOneAndUpdate({
            _id: orderId,
            address: {$in: req.user.addresses}
        }, {status: 'received'})

        if (order) {
            return res.status(200).json({
                success: true,
                order
            })
        }

        return res.status(400).json({
            success: false,
            message: 'Order doesn\'t exist'
        })
    } catch (e) {
        next(e)
    }
}