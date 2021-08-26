import {Button, Result} from "antd";
import MainLayout from "../../components/MainLayout";
import React from "react";
import {ResultStatusType} from "antd/es/result";

export const exceptionTemplate = (status: ResultStatusType, title: string, subtitle: string): React.FC => {
    return () => {
        return (
            <MainLayout>
                <Result
                    status={status}
                    title={title}
                    subTitle={subtitle}
                    extra={<Button type="primary">Back Home</Button>}
                />
            </MainLayout>
        )
    }
}