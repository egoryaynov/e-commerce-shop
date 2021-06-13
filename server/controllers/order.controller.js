const ErrorResponse = require("../utils/ErrorResponse");
const Order = require('../models/Order')

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

    if (!address._id || products.length === 0) {
        return next(new ErrorResponse('Incorrect values of order', 400))
    }

    try {
        const createOrder = async () => {
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


            // 1. Записать новый заказ в user.orders
            // 2. поместить в новый заказ id's продуктов
            // 3. установить статус "оплачено"
            // 4. у всех продуктов buyCount++
            // 5. отправить заказ доставке (подумать в каком виде)
        }

        // imitation async request on payment service
        await setTimeout(createOrder, 5000)
    } catch (error) {
        next(error)
    }
}