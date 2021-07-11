import React, {useEffect, useState} from 'react';
import {TableCell, TableContainer} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import AddColorPopup from "./AddColorPopup";
import ClearIcon from '@material-ui/icons/Clear';

const ColorsTable = React.memo(({setColors: setFormColors, currentColors}) => {
    const [colors, setColors] = useState(currentColors || []);
    const [mustShowPopup, setMustShowPopup] = useState(false);

    useEffect(() => {
        setFormColors(colors)
    }, [colors, setFormColors])

    const addColor = (name, hex) => {
        setColors([...colors, {name, hex}])
    }

    const handleOpenPopup = () => {
        setMustShowPopup(true)
    }
    const handleClosePopup = (name, hex) => {
        if (name && hex) {
            addColor(name, hex)
        }
        setMustShowPopup(false)
    }

    const deleteRow = (row) => {
        setColors(colors.filter(color => color.name !== row.name))
    }

    return (
        <>
            <Button
                variant="text"
                color="primary"
                startIcon={<AddIcon/>}
                onClick={handleOpenPopup}
            >
                Add color
            </Button>

            <AddColorPopup open={mustShowPopup} addColor={addColor} handleClosePopup={handleClosePopup}/>

            {colors.length > 0 &&
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Hex</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {colors.map((color) => (
                            <TableRow key={color.name}>
                                <TableCell>{color.name}</TableCell>
                                <TableCell>{color.hex}</TableCell>
                                <TableCell>
                                    <div style={{
                                        borderRadius: '50%',
                                        backgroundColor: color.hex,
                                        width: '30px',
                                        height: '30px'
                                    }}/>
                                </TableCell>
                                <TableCell style={{cursor: 'pointer'}} onClick={() => deleteRow(color)}>
                                    <ClearIcon/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    );
});

export default ColorsTable;
