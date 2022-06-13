import { Select, Typography } from "antd"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RootState } from "redux/store"
import { AddressItemType } from "types/Address";

const { Option } = Select;

type PropsType = {
    setAddress: React.Dispatch<React.SetStateAction<AddressItemType | null>>
}

const AddressSelector: React.FC<PropsType> = ({ setAddress }) => {
    const user = useSelector((state: RootState) => state.auth.user)

    const handleChange = (value: string) => {
        setAddress(user?.addresses.find((item) => item._id === value) || null)
    }

    useEffect(() => {
        setAddress(user?.addresses[0] || null)
    }, [])

    if (!user) return null
    
    return (
        <div>
            <Typography.Text strong>Адрес: </Typography.Text>
            <Select onChange={handleChange} defaultValue={user.addresses[0]._id}>
                {user.addresses.map(address => (
                    <Option key={address._id} value={address._id}>{address.full}</Option>
                ))}
            </Select>
        </div>
    )
}

export default AddressSelector