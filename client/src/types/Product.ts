export type Product = {}

export type ProductInList = {
    _id: string
    name: string
    price: string
    description: string
    discount?: string
    colors: [{ _id: string, name: string, hex: string }]
    category: [{ _id: string, name: string }]
    image?: string
}

export type ProductsList = [ProductInList]