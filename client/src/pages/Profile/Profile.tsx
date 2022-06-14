import Title from "antd/lib/typography/Title"
import OrdersTable from "components/OrdersTable/OrdersTable";
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { RootState } from "redux/store"

const Profile = () => {
    const history = useHistory();
    const user = useSelector((state: RootState) => state.auth.user)

    if (!user) history.push("/login")
    
    return (
        <>
            <Title level={2}>Профиль</Title>

            {user && user.orders.length > 0 && <>
                    <Title level={2}>Заказы</Title>
                    <OrdersTable orders={user.orders} />
                </>
            }
        </>
    )
}

export default Profile