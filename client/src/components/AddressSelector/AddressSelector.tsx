import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Select, Typography } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { RootState } from "redux/store"
import { AddressItemType } from "types/Address";
import AddressSelectorAddForm from "./AddressSelectorAddForm";

const { Option } = Select;

type PropsType = {
    setAddress: React.Dispatch<React.SetStateAction<AddressItemType | null>>
}

const AddressSelector: React.FC<PropsType> = ({ setAddress }) => {
    const [formVivible, setFormVivible] = useState(false)

    const user = useSelector((state: RootState) => state.auth.user)

    const handleChange = (value: string) => {
        setAddress(user?.addresses.find((item) => item._id === value) || null)
    }

    useEffect(() => {
        setAddress(user?.addresses[0] || null)
    }, [])
    
    if (!user) return null
    
    return (
        <>
            {user.addresses.length > 0 &&
                <div>
                    <Typography.Text strong>Адрес: </Typography.Text>
                    <Select onChange={handleChange} defaultValue={user.addresses[0]._id}>
                        {user.addresses.map(address => (
                            <Option key={address._id} value={address._id}>{address.full}</Option>
                        ))}
                    </Select>
                </div>
            }
            
            <div style={{ marginTop: 20 }}>
                {formVivible
                    ? <AddressSelectorAddForm onCancel={() => setFormVivible(false)}/>
                    : <Button type="link" style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10 }} onClick={() => setFormVivible(true)}>
                        <PlusCircleOutlined /> Добавить адрес
                    </Button>
                }
            </div>
        </>
    )
}

export default AddressSelector