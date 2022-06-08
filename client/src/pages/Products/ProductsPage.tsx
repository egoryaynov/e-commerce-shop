import { useEffect, useMemo, useState } from "react"
import qs from "querystring"
import { Link, useLocation } from "react-router-dom"
import Title from "antd/lib/typography/Title"
import { GetProductsParams, useLazyGetProductsQuery } from "services/productsApi"
import ProductsGrid from "components/Products/ProductsGrid"
import Pagination from "antd/es/pagination"
import { CloseOutlined } from "@ant-design/icons"
import { Divider } from "antd"

const PAGE_LIMIT = 10

const ProductsPage = () => {
    const location = useLocation()
    const [page, setPage] = useState(1)

    const [trigger, { isLoading, data, error }] = useLazyGetProductsQuery()

    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search)
    }, [location])
    
    useEffect(() => {
        const options: GetProductsParams = { limit: PAGE_LIMIT, page }

        const paramsKeys = Array.from(queryParams)
        if (paramsKeys.length > 0 && queryParams.has('category')) {
            options.filter = 'category'
            // @ts-ignore
            options.categories = queryParams.get('category')
        }
        
        trigger(options)
    }, [page, queryParams]);

    return (
        <>
            <Title level={2}>Товары</Title>

            {Array.from(queryParams).length > 0 && 
                <Link to={"/products"} style={{ padding: 10, border: '1px solid #40a9ff', borderRadius: 30, fontSize: 14, fontWeight: 'bold' }}><CloseOutlined /> Сбросить фильтры</Link>
            }

            <Divider />

            <ProductsGrid products={data ? data.products.docs : null} isLoading={isLoading} error={error} />
            
            {data &&
                <Pagination 
                    current={page}
                    total={data.products.totalPages} 
                    defaultPageSize={PAGE_LIMIT}
                    onChange={(newPage) => setPage(newPage)}
                    showSizeChanger={false}
                    style={{ marginTop: 25 }}
                />
            }
        </>
    )
}

export default ProductsPage