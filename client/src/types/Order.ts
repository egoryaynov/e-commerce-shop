export type OrdersItemType = {
    products: string[]
    finished: boolean
    _id: string
    status: "delivered" | 'paid' | 'received' | 'picked'
    address: string
    date: string
    totalCost: number
}