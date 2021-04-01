const Category = require('../models/Category')
const Types = require('mongoose').Types

const parseQueryParams = async (req) => {
    const result = {}
    result.sort = {}

    let categories;

    // FILTERS
    if (req.query.filter && req.query.filter.includes('category') && req.query.categories) {
        categories = req.query.categories.split(',')
    }
    if (req.query.filter && req.query.filter.includes('color') && req.query.colors) {
        result.colorsFilters = req.query.colors.split(',')
    }
    if (req.query.filter && req.query.filter.includes('discount')) {
        result.hasDiscountFilter = true
    }

    // get categories id's
    if (categories) {
        await Category.find({
            name: {
                $in: categories
            }
        }, (err, doc) => {
            if (!err) {
                result.categoriesIds = doc.map(document => document._id)
            }
        })
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

    result.page = req.query.page || 1
    return result
}

module.exports.getAggregateQuery = async function (req) {
    const parsedQuery = await parseQueryParams(req)

    const aggregateQuery = [
        {
            $match: {}
        },
        {
            $sort: {}
        }
    ]

    // FILTERS
    if (parsedQuery.categoriesIds) {
        aggregateQuery[0].$match.category = {
            $in: parsedQuery.categoriesIds
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
        aggregateQuery[0].$match.normalizedName = {
            $regex: parsedQuery.search,
            $options: 'i'
        }
    }

    // SORT
    const sort = parsedQuery.sort
    const sortName = parsedQuery.sort.name
    aggregateQuery[1].$sort[sortName === 'name' ? 'normalizedName' : sortName] =
        sort.type === 'asc' ? 1 : sort.type === 'desc' ? -1 : 1

    return aggregateQuery
}