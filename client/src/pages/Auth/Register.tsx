import React, { useEffect, useState } from 'react';
import Title from "antd/lib/typography/Title"
import { Alert, Button, Form, Input } from 'antd';
import { useLazyLoginQuery, useLazyRegisterQuery } from 'services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from 'redux/slices/authSlice';
import { RootState } from 'redux/store';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    const user = useSelector((state: RootState) => state.auth.user)

    const [trigger, { isLoading, data, error }] = useLazyRegisterQuery()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [secondName, setSecondName] = useState('')

    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (email.length > 0 && password.length > 0 && firstName.length > 0 && middleName.length > 0 && secondName.length > 0) {
            setDisabled(false)
        }
    }, [email, password])

    const onLoginHandler = () => {
        trigger({ 
            email, password, firstName, middleName, secondName
         })
    }

    useEffect(() => {
        if (data && data.success) {
            dispatch(addToken(data.token))
            window.location.reload();
        }
    }, [data])

    if (user) history.push("/products")

    return (
        <div style={{ width: 500 }}>
            <Title level={2}>Регистрация</Title>

            <Form
                labelAlign='left'
            >
                <Form.Item label="Имя" required>
                    <Input value={firstName} onChange={(event) => setFirstName(event.currentTarget.value)} />
                </Form.Item>
                <Form.Item label="Фамилия" required>
                    <Input value={secondName} onChange={(event) => setSecondName(event.currentTarget.value)} />
                </Form.Item>
                <Form.Item label="Отчество" required>
                    <Input value={middleName} onChange={(event) => setMiddleName(event.currentTarget.value)} />
                </Form.Item>
                <Form.Item label="Почта" required>
                    <Input value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
                </Form.Item>
                <Form.Item label="Пароль" required>
                    <Input.Password value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
                </Form.Item>
            </Form>

            {error && <Alert style={{ marginTop: 15 }} type={'error'} message={'Вы ввели неверные данные'} banner />}

            <Link to="/login">Войти по логину и паролю</Link>
            <Button disabled={disabled || isLoading} size='large' type="primary" style={{ width: '100%', marginTop: 5 }} onClick={onLoginHandler}>Зарегистрироваться</Button>
        </div>
    );
};

export default Register;
