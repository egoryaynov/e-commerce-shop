const ErrorResponse = require("../utils/ErrorResponse")
const Order = require('../models/Order')
const {Product} = require("../models/Product")
const http = require('http')
const axios = require("axios");

exports.payOrder = async (req, res, next) => {
    // todo realize PayPal sandbox payment
    /* схема заказа :
        1. пользователь набирает товары в корзину (сохраняется в localstorage)
        2. пользователь оплачивает по этому url
        3. тут создается заказ, ставится статус оплачено, заполняется нужная информация
        4. заказ идет в сервис доставки
     */

    const {address, products} = req.body
    const user = req.user

    if (!address || !products || products.length === 0) {
        return next(new ErrorResponse('Incorrect values of order', 400))
    }

    try {
        const createOrder = async () => {
            const productIDs = products.map(product => product._id)

            const order = new Order({
                status: 'paid',
                products: productIDs
            })

            user.orders.push(order._id)

            // отправить заказ доставке (подумать в каком виде)
            /*
             DEEP POPULATE
                          BlogModel
                          .find({})
                          .populate({
                            path : 'userId',
                            populate : {
                              path : 'reviewId'
                            }
                          })
             */
            await axios
                .post(`http://127.0.0.1:${process.env.DELIVERY_PORT}`, {
                    order: order
                })
                .then(res => {
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(res)
                })
                .catch(error => {
                    console.error(error)
                })

            // SAVING ORDER
            await Product.updateMany({_id: {$in: productIDs}}, {$inc: {buyCount: 1}})

            await order.save()
            await user.save()

            return order
        }

        // imitation async request on payment service
        await setTimeout(async () => {
            res.status(201).json({
                success: true,
                order: await createOrder()
            })
        }, 5000)
    } catch (error) {
        next(error)
    }
}