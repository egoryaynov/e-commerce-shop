import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import Title from "../common/Title";

export default function Chart({orders}) {
    const theme = useTheme();
    
    return (
        <React.Fragment>
            <Title>Chart</Title>
            {orders &&
                <ResponsiveContainer>
                    <LineChart
                        data={orders.map(order => ({
                            date: new Date(order.date).toDateString(),
                            amount: order.totalCost
                        }))}
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }}
                    >
                        <XAxis dataKey="date" stroke={theme.palette.text.secondary}/>
                        <YAxis stroke={theme.palette.text.secondary}>
                            <Label
                                angle={270}
                                position="left"
                                style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                            >
                                Sales ($)
                            </Label>
                        </YAxis>
                        <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            }
        </React.Fragment>
    );
}