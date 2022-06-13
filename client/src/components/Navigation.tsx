import React from 'react';
import {Menu} from "antd";
import {NavLink, useLocation} from 'react-router-dom';

const Navigation = () => {
    const location = useLocation()

    return (
        <>
            <Menu mode="horizontal"
                  theme={"dark"}
                  style={{justifyContent: 'center'}}
                  selectedKeys={[location.pathname]}
            >
                <Menu.Item key="/">
                    <NavLink to="/">
                        <span>Главная</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/products">
                    <NavLink to="/products">
                        <span>Каталог</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/categories">
                    <NavLink to="/categories">
                        <span>Категории</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/profile">
                    <NavLink to="/profile">
                        <span>Профиль</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/cart">
                    <NavLink to="/cart">
                        <span>Корзина</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Navigation;
