const Category = require('../models/Category')
const ErrorResponse = require('../utils/ErrorResponse')

exports.createCategory = async (req, res, next) => {
    const {name} = req.body

    try {
        if (name && name.length > 0) {
            await Category.create({name}, async (err) => {
                if (err) {
                    next(new ErrorResponse('Error on create category', 500))
                } else {
                    res.status(201).json({
                        success: true,
                        categories: await Category.find({})
                    })
                }
            })
        } else {
            next(new ErrorResponse('Category name incorrect', 400))
        }
    } catch (error) {
        next(error)
    }
}

exports.getCategories = async (req, res, next) => {
    try {
        await Category.find({}, (err, doc) => {
            if (err) {
                return next(new ErrorResponse('Error on load categories', 500))
            } else {
                res.status(200).json({
                    success: true,
                    categories: doc
                })
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteCategory = async (req, res, next) => {
    const {categoryId} = req.body

    try {
        await Category.findByIdAndDelete(categoryId, {}, async (err, doc) => {
            if (err) {
                return next(new ErrorResponse('Error on delete category', 500))
            } else {
                res.status(200).json({
                    success: true,
                    categories: await Category.find({})
                })
            }
        })
    } catch (error) {
        next(error)
    }
}