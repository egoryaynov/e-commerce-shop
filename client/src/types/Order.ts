export type OrdersItemType = {
    products: {
        _id: string
        product: {
            _id: string
            name: string
            price: number
            description: string
            discount?: number
            color: {
                _id: string
                hex: string
                name: string
            }[]
        }
        color: {
            _id: string
            name: string
            hex: string
        }
    }[]
    finished: boolean
    _id: string
    status: "delivered" | 'paid' | 'received' | 'picked'
    address: {
        full: string
    }
    date: string
    totalCost: number
}