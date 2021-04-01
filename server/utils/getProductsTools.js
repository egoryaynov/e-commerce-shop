const getProductsTools = (req) => {
    const result = {}
    result.sort = {}

    // FILTERS
    if (req.query.filter && req.query.filter.includes('category') && req.query.categories) {
        result.categoriesFilters = req.query.categories.split(',')
    }
    if (req.query.filter && req.query.filter.includes('color') && req.query.colors) {
        result.colorsFilters = req.query.colors.split(',')
    }
    if (req.query.filter && req.query.filter.includes('discount')) {
        result.hasDiscountFilter = true
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

module.exports.getAggregateQuery = function (req) {
    const parsedQuery = getProductsTools(req)

    const aggregateQuery = [
        {
            $match: {}
        }
    ]

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
        }
    }

    return aggregateQuery
}