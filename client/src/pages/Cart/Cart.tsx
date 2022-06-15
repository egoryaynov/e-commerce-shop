import { Alert, Button, Table, notification } from "antd"
import Title from "antd/lib/typography/Title"
import AddressSelector from "components/AddressSelector/AddressSelector"
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { RootState } from "redux/store"
import { useLazySendOrderQuery } from "services/orderApi"
import { AddressItemType } from "types/Address"
import { CartProductsItem } from "types/Product";
import { clearCart, deleteProductFromCart } from "redux/slices/cartSlice";
import { addOrder } from "redux/slices/authSlice";
import TableColorColumn from "components/TableColorColumn";

type DataType = Omit<CartProductsItem['product'], 'discount'> & { color: {name: string, hex: string} }

const CartPage = () => {
    const history = useHistory();
    const [trigger, { isLoading, data, error }] = useLazySendOrderQuery()

    const [disabled, setdisabled] = useState(true)
    const [address, setAddress] = useState<AddressItemType | null>(null)
    
    const cartProducts = useSelector((state: RootState) => state.cart.products)
    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch()

    const onOrderClickHandler = () => {
        if (!user) {
            history.push("/login")
        } else if (address && cartProducts) {
            trigger({address, products: cartProducts})
        }
    }

    const onDeleteClickHandler = (record: DataType) => {
        dispatch(deleteProductFromCart(record._id))
    }

    const tableColumns: ColumnsType<DataType> = useMemo(() => [
        {
            title: 'Название товара ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Стоимость',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Цвет', dataIndex: 'color', render(_, record) {
                return <TableColorColumn hex={record.color.hex} name={record.color.name} />
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => onDeleteClickHandler(record)} type="link" danger>
                    Удалить
                </Button>
            ),
        },
    ], [])

    const tableData: DataType[] | undefined = useMemo(() => cartProducts?.map(product => ({
        _id: product.product._id,
        name: product.product.name,
        price: product.product.discount || product.product.price,
        color: product.color
    })), [cartProducts])

    useEffect(() => {
        if (address && cartProducts && cartProducts.length > 0) {
            setdisabled(false)
        } else {
            setdisabled(true)
        }
    }, [address, cartProducts])

    useEffect(() => {
        if (data) {
            dispatch(clearCart())
            dispatch(addOrder(data.order))
            
            notification["success"]({
                message: "Заказ успешно создан!"
            })
        }
    }, [data])
    
    return (
        <div>
            <Title level={2}>Корзина</Title>

            {cartProducts && cartProducts.length > 0  
                ? <>
                    {<Table pagination={false} dataSource={tableData} columns={tableColumns} />}
                    
                    {user
                        ? <div style={{ marginTop: 15 }}><AddressSelector setAddress={setAddress} /></div>
                        : <Alert style={{ marginTop: 15 }} type={'warning'} message={<span>Необходимо <Link to="/login">авторизоваться</Link></span>} banner />
                    }
                    <Button loading={isLoading} type="primary" disabled={disabled} onClick={onOrderClickHandler} style={{ marginTop: 15 }}>Оформить заказ</Button>
                </> 
                : <Alert style={{ marginTop: 15 }} type={'warning'} message={'Вы не добавили товары в корзину'} banner />
            }
        </div>
    )
}

export default CartPage