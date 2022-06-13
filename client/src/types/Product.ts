export type Product = {
    buyCount: number
    category: {
        _id: string
        name: string
    }
    colors: {
        hex: string
        name: string
        _id: string
    }[]
    comments: []
    description: string
    images: string[]
    name: string
    price: number
    _id: string
}

export type ProductInList = {
    _id: string
    name: string
    price: string
    description: string
    discount?: string
    colors: [{ _id: string, name: string, hex: string }]
    category: [{ _id: string, name: string }]
    image?: string
    buyCount: number
}

export type CartProductsItem = {
    product: {
        _id: string
        name: string
        price: number
        discount?: number
    },
    color: {
        name: string,
        hex: string
    }
}

export type ProductsList = ProductInList[]