const Category = require('../models/Category')
const mongoose = require('mongoose');

const parseQueryParams = async (req) => {
    const result = {}
    result.sort = {}

    // FILTERS
    if (req.query.filter && req.query.filter.includes('category') && req.query.categories) {
        result.categories = req.query.categories.split(',').map(id => mongoose.Types.ObjectId(id.trim()))
    }
    if (req.query.filter && req.query.filter.includes('color') && req.query.colors) {
        result.colorsFilters = req.query.colors.split(',')
    }
    if (req.query.filter && req.query.filter.includes('discount')) {
        result.hasDiscountFilter = true
    }
    if (req.query.id) {
        result.id = req.query.id.split(',').map(id => mongoose.Types.ObjectId(id.trim()))
    }

    // SORT
    if (req.query.sort) {
        const splitSort = req.query.sort.split('_')

        result.sort.name = splitSort[0]
        result.sort.type = splitSort[1]
    } else if (!req.query.sort) {
        result.sort.name = 'name'
        result.sort.type = 'asc'
    }

    // SEARCH
    if (req.query.search) {
        result.search = req.query.search
    }

    result.page = parseInt(req.query.page, 10) || 1
    result.limit = parseInt(req.query.limit, 10) || parseInt(process.env.PRODUCT_PAGE_SIZE, 10)
    return result
}

module.exports.getAggregateQuery = async function (req) {
    const parsedQuery = await parseQueryParams(req)
    const pageOptions = {
        page: parsedQuery.page,
        limit: parsedQuery.limit
    }

    const aggregateQuery = [
        {
            $match: {}
        },
        {
            $project: {
                buyCount: 1,
                name: 1,
                price: 1,
                category: 1,
                colors: 1,
                discount: 1,
                description: 1,
                image: {
                    $first: "$images"
                }
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        }
    ]

    // FILTERS
    if (parsedQuery.categories) {
        aggregateQuery[0].$match.category = {
            $in: parsedQuery.categories
        }
    }
    if (parsedQuery.id) {
        aggregateQuery[0].$match._id = {
            $in: parsedQuery.id
        }
    }
    if (parsedQuery.colorsFilters) {
        aggregateQuery[0].$match['colors.name'] = {
            $in: parsedQuery.colorsFilters
        }
    }
    if (parsedQuery.hasDiscountFilter) {
        aggregateQuery[0].$match.discount = {
            $exists: true
        }
    }
    if (parsedQuery.search) {
        aggregateQuery[0].$match.name = {
            $regex: parsedQuery.search,
            $options: 'i'
        }
    }

    // SORT
    const sortName = parsedQuery.sort.name
    const sortType = parsedQuery.sort.type

    const aggregateSort = {}
    aggregateSort[sortName === 'name' ? 'normalizedName' : sortName] =
        sortType === 'desc' ? -1 : 1

    return [aggregateQuery, aggregateSort, pageOptions.page, pageOptions.limit]
}