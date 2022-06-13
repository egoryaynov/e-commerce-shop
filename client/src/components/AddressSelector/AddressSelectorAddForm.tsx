import {
    Button,
    Form,
    Input,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rewriteAddresses } from 'redux/slices/authSlice';

import { useLazyCreateAddressQuery } from 'services/addressApi'

type PropsType = {
    onCancel: () => void
}
const AddressSelectorAddForm: React.FC<PropsType> = ({ onCancel }) => {
    const [trigger, { isLoading, data, error }] = useLazyCreateAddressQuery()

    const dispatch = useDispatch()

    const [disabled, setDisabled] = useState(true)
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [postcode, setPostcode] = useState('');
    
    useEffect(() => {
        const getIsNotEmpty = (str: string) => str.length > 0

        if ([country, city, street, houseNumber, apartmentNumber, postcode].every((val) => getIsNotEmpty(val))) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [country, city, street, houseNumber, apartmentNumber, postcode])

    const onAddClick = () => {
        trigger({apartmentNumber, city, country, houseNumber, postcode, street})
    }

    useEffect(() => {
        if (data) {
            dispatch(rewriteAddresses(data.addresses))
            onCancel()
        }
    }, [data])

    return (
        <div>
            <Form
                style={{ width: 800 }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                labelAlign='left'
            >
                <Form.Item label="Страна" required>
                    <Input value={country} onChange={(event) => setCountry(event.currentTarget.value)}/>
                </Form.Item>
                <Form.Item label="Город" required>
                    <Input value={city} onChange={(event) => setCity(event.currentTarget.value)}/>
                </Form.Item>
                <Form.Item label="Улица" required>
                    <Input value={street} onChange={(event) => setStreet(event.currentTarget.value)}/>
                </Form.Item>
                <Form.Item label="Номер дома" required>
                    <Input value={houseNumber} onChange={(event) => setHouseNumber(event.currentTarget.value)}/>
                </Form.Item>
                <Form.Item label="Номер квартиры" required>
                    <Input value={apartmentNumber} onChange={(event) => setApartmentNumber(event.currentTarget.value)}/>
                </Form.Item>
                <Form.Item label="Индекс" required>
                    <Input value={postcode} onChange={(event) => setPostcode(event.currentTarget.value)}/>
                </Form.Item>
            </Form>
            <Button disabled={disabled} size='small' type="primary" style={{ marginRight: 10 }} onClick={onAddClick}>
                Добавить
            </Button>
            <Button size='small' danger onClick={onCancel}>
                Отменить
            </Button>
        </div>
    )
}

export default AddressSelectorAddForm