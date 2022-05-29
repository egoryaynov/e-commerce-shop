import {Button, Result} from "antd";
import React from "react";
import {ResultStatusType} from "antd/es/result";
import {Link} from "react-router-dom";

type PropsType = {
    statusCode: ResultStatusType
    title: string
    subtitle: string
}

export const Exception: React.FC<PropsType> = ({statusCode, title, subtitle}) => {
    return (
        <Result
            status={statusCode}
            title={title}
            subTitle={subtitle}
            extra={
                <Button type="primary"><Link to="/">Главная</Link></Button>
            }
        />
    )
}