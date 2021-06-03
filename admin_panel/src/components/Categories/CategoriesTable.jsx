import React, {useContext, useRef, useState} from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {ClickAwayListener, TableCell, TableContainer, TextField, Typography} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import {TokenContext} from "../../context/TokenContext";
import {CategoryApi} from "../../api/CategoryApi";
import {useHttp} from "../../hooks/useHttp";

const CategoriesTable = React.memo(({categories, removeClickHandler, setCategories}) => {
    const {token} = useContext(TokenContext)

    const {isLoading, request, error} = useHttp()
    const [changedCategoryName, setChangedCategoryName] = useState('')
    const [mustShowInputForId, setMustShowInputForId] = useState(null)
    const changeInputRef = useRef()

    const changeCategoryName = async () => {
        const options = new CategoryApi()
        options.changeCategory(mustShowInputForId, changedCategoryName, token)

        await request(options).then(data => {
            if (data.success) {
                setCategories(data.categories)
            }
        })

        setMustShowInputForId(null)
        setChangedCategoryName('')
    }

    const ChangeCategoryInput = () => {
        return (
            <ClickAwayListener onClickAway={changeCategoryName}>
                <TextField ref={changeInputRef}
                           id="outlined-basic"
                           variant="standard"
                           value={changedCategoryName}
                           onChange={(event) => setChangedCategoryName(event.target.value)}/>
            </ClickAwayListener>
        )
    }

    const changeClickHandler = (category) => {
        if (!mustShowInputForId) {
            setMustShowInputForId(category._id)
            setChangedCategoryName(category.name)
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
                                    ? <ChangeCategoryInput/>
                                    : <Typography variant='body1'>{category.name}</Typography>}
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
