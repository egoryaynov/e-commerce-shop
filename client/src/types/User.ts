import { AddressItemType } from "./Address"
import { OrdersItemType } from "./Order"

export type User = {
    addresses: AddressItemType[]
    orders: OrdersItemType[]
    _id: string
    firstName: string
    secondName: string
    middleName: string
    email: string
}