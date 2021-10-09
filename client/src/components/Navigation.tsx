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
                        <span>Home</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/other">
                    <NavLink to="/other">
                        <span>Applications</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/notifications">
                    <NavLink to="/notifications">
                        <span>Notifications</span>
                    </NavLink>
                </Menu.Item>
                <Menu.SubMenu key="/categories" title="Categories">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </>
    );
};

export default Navigation;
