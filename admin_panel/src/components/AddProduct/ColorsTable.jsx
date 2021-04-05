import React, {useEffect, useState} from 'react';
import {TableCell, TableContainer} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import AddColorPopup from "./AddColorPopup";

function createData(name, hex) {
    return {name, hex};
}

const rows = [];

const ColorsTable = React.memo(() => {
        const [colors, setColors] = useState([]);
        const [mustShowPopup, setMustShowPopup] = useState(false);

        useEffect(() => {
            if (colors.length > 0) {
                const addedColor = colors[colors.length - 1]

                rows.push(createData(addedColor.name, addedColor.hex))
            }
        }, [colors])

        const addColor = (name, hex) => {
            setColors([...colors, {name, hex}])
        }

        const handleOpenPopup = () => {
            setMustShowPopup(true)
        }
        const handleClosePopup = (name, hex) => {
            if (name && hex) {
                console.log(name, hex)
                alert()
                addColor(name, hex)
            }
            setMustShowPopup(false)
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.hex}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
            </>
        );
    }
);

export default ColorsTable;
