import React, {useContext, useState} from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {ClickAwayListener, TableCell, TableContainer, TextField, Typography} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import {TokenContext} from "../../context/TokenContext";
import {CategoryApi} from "../../api/CategoryApi";
import {useHttp} from "../../hooks/useHttp";

const ChangeCategoryInput = ({changeCategoryName, initialName}) => {
    const [changedCategoryName, setChangedCategoryName] = useState(initialName)

    return (
        <ClickAwayListener onClickAway={() => changeCategoryName(changedCategoryName)}>
            <TextField id="outlined-basic"
                       autoFocus
                       variant="standard"
                       value={changedCategoryName}
                       onChange={(event) => setChangedCategoryName(event.target.value)}/>
        </ClickAwayListener>
    )
}

const CategoriesTable = React.memo(({categories, removeClickHandler, setCategories}) => {
    const {token} = useContext(TokenContext)

    const {request} = useHttp()
    const [mustShowInputForId, setMustShowInputForId] = useState(null)

    const changeCategoryName = async (name) => {
        if (name.length > 0 && name !== categories.find(category => category._id === mustShowInputForId).name) {
            const options = new CategoryApi()
            options.changeCategory(mustShowInputForId, name, token)

            await request(options).then(data => {
                if (data.success) {
                    setCategories(data.categories)
                }
            })
        }

        setMustShowInputForId(null)
    }

    const changeClickHandler = (category) => {
        if (!mustShowInputForId) {
            setMustShowInputForId(category._id)
        }
    }

    return (
        <TableContainer style={{paddingTop: '10px'}}>
            <Table size="medium" aria-label="a dense table">
                <TableBody>
                    {categories.map((category) => (
                        <TableRow style={{cursor: 'pointer'}} key={category.name}>
                            <TableCell onClick={() => changeClickHandler(category)}>
                                {(mustShowInputForId && category._id === mustShowInputForId)
                                    ? <ChangeCategoryInput changeCategoryName={changeCategoryName}
                                                           initialName={category.name}/>
                                    : <Typography style={{width: '300px'}} variant='body1'>{category.name}</Typography>}
                            </TableCell>
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
