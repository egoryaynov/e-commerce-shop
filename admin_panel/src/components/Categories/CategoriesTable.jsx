import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {TableCell, TableContainer} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const CategoriesTable = React.memo(({categories, removeClickHandler}) => {
    return (
        <TableContainer style={{paddingTop: '10px'}}>
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.name}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell style={{cursor: 'pointer'}}
                                       onClick={() => removeClickHandler(category)}>
                                <ClearIcon/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
})

export default CategoriesTable;
