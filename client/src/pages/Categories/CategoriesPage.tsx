import Title from "antd/lib/typography/Title"
import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "services/categoryApi"

const CategoriesPage = () => {
    const { data, error, isLoading } = useGetCategoriesQuery({})

    return (
        <>
            <Title level={2}>Категории</Title>
            {data && data.categories.map(category => (
                <Link to={`/products?category=${category._id}`} style={{ display: 'block' }}>{category.name}</Link>
            ))}
        </>
    )
}

export default CategoriesPage