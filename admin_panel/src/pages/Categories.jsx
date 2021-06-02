import React, {useContext, useState} from 'react';
import Template from "../components/Template";
import {useCategories} from "../hooks/useCategories";
import {
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    TableCell,
    TableContainer,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import ClearIcon from "@material-ui/icons/Clear";
import {CategoryApi} from "../api/CategoryApi";
import {useHttp} from "../hooks/useHttp";
import {TokenContext} from "../context/TokenContext";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

const DeleteCategoryConfirm = ({open, deleteHandler, dialogCloseHandler: closeHandler}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={closeHandler}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You really want to delete category ?<br/>
                        Products with same category will be delete yet
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandler} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={deleteHandler} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


const Categories = () => {
    const {token} = useContext(TokenContext)

    const {request, isLoading: deletingCategory, error} = useHttp()
    const {categories, setCategories, isLoading: isCategoriesLoading} = useCategories()

    const [mustDialogOpen, setMustDialogOpen] = useState(false);
    const [mustRemoveCategory, setMustRemoveCategory] = useState(null);

    const deleteCategory = async ({_id: categoryId}) => {
        const options = new CategoryApi()
        options.deleteCategory(categoryId, token)

        await request(options).then(data => {
            if (data.success) {
                setCategories(data.categories)
            }
        })
    }

    const removeClickHandler = (category) => {
        setMustRemoveCategory(category)
        setMustDialogOpen(true)
    }

    const removeCategoryHandler = async () => {
        if (mustRemoveCategory) {
            await deleteCategory(mustRemoveCategory)
        }
        setMustDialogOpen(false)
    }

    const dialogCloseHandler = () => {
        setMustDialogOpen(false)
    }

    return (
        <Template title='Categories'>
            {isCategoriesLoading ? <CircularProgress/>
                : <>
                    <Button variant="contained" color="primary" startIcon={<AddIcon/>}>
                        Add new category
                    </Button>

                    {categories.length === 0 &&
                    <Typography variant='body1'>Categories doesn't exist yet</Typography>}

                    <TableContainer>
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
                </>}
            <DeleteCategoryConfirm open={mustDialogOpen} dialogCloseHandler={dialogCloseHandler}
                                   deleteHandler={removeCategoryHandler}/>
        </Template>
    );
};

export default Categories;