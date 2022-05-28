import React, {useCallback, useContext, useEffect, useState} from 'react';
import Template from "../components/Template";
import {useHttp} from "../hooks/useHttp";
import {TokenContext} from "../context/TokenContext";
import {AuthApi} from "../api/AuthApi";
import Title from "../components/common/Title";
import {CircularProgress} from "@material-ui/core";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Customers = () => {
    const {request, isLoading} = useHttp()

    const {token} = useContext(TokenContext)
    const [users, setUsers] = useState(null)

    const requestUsers = useCallback(async () => {
        const options = new AuthApi()
        options.getUsers(token)

        await request(options).then(r => setUsers(r.users))
    }, [request, token])

    useEffect(() => {
        requestUsers().then()
    }, [requestUsers])

    return (
        <Template title='Customers'>
            <Title>Customers</Title>
            {isLoading || !users
                ? <CircularProgress/>
                :
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Second name</TableCell>
                            <TableCell>Middle name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Orders count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.secondName}</TableCell>
                                <TableCell>{row.middleName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.orders.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
        </Template>
    );
};

export default Customers;
