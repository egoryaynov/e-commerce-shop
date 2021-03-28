module.exports = (req) => {
    const result = {}

    // FILTERS
    if (req.query.filter.includes('category') && req.query.categories) {
        result.categoriesFilters = req.query.categories.split(',')
    }
    if (req.query.filter.includes('color') && req.query.colors) {
        result.colorsFilters = req.query.colors.split(',')
    }
    if (req.query.filter.includes('discount')) {
        result.hasDiscountFilter = true
    }
    // SORT
    if (req.query.sort) {
        result.sort = {}

        const splitSort = req.query.sort.split('_')

        result.sort.name = splitSort[0]
        result.sort.type = splitSort[1]
    }
    // SEARCH
    if (req.query.search) {
        result.search = req.query.search
    }

    result.page = req.query.page || 1
    return result
}