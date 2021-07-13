import React, {useState} from 'react';
import {Menu} from "antd";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";

const Navigation = () => {
    const [selectedPages, setSelectedPages] = useState(['mail'])

    const handleClick = (e: { key: any; }) => {
        console.log('click ', e);
        setSelectedPages(e.key);
    };

    return (
        <div>
            <Header>
                <Menu onClick={handleClick} selectedKeys={selectedPages} mode="horizontal"
                      style={{justifyContent: 'center'}}>
                    <Menu.Item key="mail" icon={<MailOutlined/>}>
                        Navigation One
                    </Menu.Item>
                    <Menu.Item key="app" disabled icon={<AppstoreOutlined/>}>
                        Navigation Two
                    </Menu.Item>
                    <Menu.SubMenu key="SubMenu" icon={<SettingOutlined/>} title="Navigation Three - Submenu">
                        <Menu.ItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                    <Menu.Item key="alipay">
                        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                            Navigation Four - Link
                        </a>
                    </Menu.Item>
                </Menu>
            </Header>
        </div>
    );
};

export default Navigation;
