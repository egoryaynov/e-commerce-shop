import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import TableColorColumn from 'components/TableColorColumn';
import { ExpandedRowRender } from 'rc-table/lib/interface';
import React from 'react';
import { OrdersItemType } from 'types/Order';

interface DataType {
    key: React.Key
    date: string
    address: string
    totalCost: number
    status: "delivered" | 'paid' | 'received' | 'picked'
    products: OrdersItemType['products']
}

interface ExpandedDataType {
    _id: string;
    name: string;
    price: number;
    discount?: number | undefined
    color: {hex: string, name: string}
}

const OrdersTable: React.FC<{ orders: OrdersItemType[] }> = ({ orders }) => {
    const expandedRowRender: ExpandedRowRender<DataType> = (props) => {
        const columns: ColumnsType<ExpandedDataType> = [
            { title: 'Название товара', dataIndex: 'name', key: 'name' },
            { title: 'Стоимость', dataIndex: 'price', render(_, record) {
                return <span>{record.discount ? record.discount : record.price}</span>
            } },
            { title: 'Цвет', dataIndex: 'color', render(_, record) {
                return <TableColorColumn hex={record.color.hex} name={record.color.name} />
            } },
        ];

        const data: ExpandedDataType[] = [];
        for (let i = 0; i < props.products.length; ++i) {
            data.push({
                _id: props.products[i].product._id,
                color: props.products[i].color,
                name: props.products[i].product.name,
                price: props.products[i].product.price,
                discount: props.products[i].product.discount
            });
        }

        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns: ColumnsType<DataType> = [
        { title: 'Дата', dataIndex: 'date', key: 'date' },
        { title: 'Адрес', dataIndex: 'address', key: 'address' },
        { title: 'Статус', dataIndex: 'version', render(_, record) {
            const status = record.status
            const statusText = status === "delivered" 
                ? "Доставлено" 
                : status === "paid" 
                    ? "Оплачено"
                    : status === "picked" ? "Отправлено" : "Получено"

            let statusProp: "default" | "success" | "processing" = "default"
            if (status === 'delivered') statusProp = "processing"
            if (status === 'received') statusProp = "success"

            return <span>
                <Badge status={statusProp} />
                {statusText}
            </span>
        }},
        { title: 'Сумма', dataIndex: 'totalCost', key: 'totalCost' },
    ];

    const data: DataType[] = [];
    for (let i = 0; i < orders.length; i++) {
        data.push({
            key: i,
            address: orders[i].address.full,
            date: (new Date(orders[i].date)).toLocaleDateString(),
            totalCost: orders[i].totalCost,
            status: orders[i].status,
            products: orders[i].products
        });
    }

    // date: string
    // adddress: string
    // totalCost: number
    // status: "delivered" | 'paid' | 'received' | 'picked'

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={data}
            pagination={false}
        />
    );
};

export default OrdersTable;