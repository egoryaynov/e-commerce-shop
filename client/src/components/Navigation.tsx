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
                {/*<Menu.Item key="/categories">*/}
                {/*    <NavLink to="/categories">*/}
                {/*        <span>Categories</span>*/}
                {/*    </NavLink>*/}
                {/*</Menu.Item>*/}
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
            </Menu>
        </>
    );
};

export default Navigation;
