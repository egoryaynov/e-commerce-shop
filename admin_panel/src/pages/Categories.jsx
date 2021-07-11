import React, {useContext, useState} from 'react';
import Template from "../components/Template";
import {useCategories} from "../hooks/useCategories";
import {
    CircularProgress, ClickAwayListener,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
} from "@material-ui/core";
import {CategoryApi} from "../api/CategoryApi";
import {useHttp} from "../hooks/useHttp";
import {TokenContext} from "../context/TokenContext";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import CategoriesTable from "../components/Categories/CategoriesTable";

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

        const {request, isLoading: changingCategory} = useHttp()
        const {categories, setCategories, isLoading: isCategoriesLoading} = useCategories()

        const [mustDialogOpen, setMustDialogOpen] = useState(false)
        const [mustRemoveCategory, setMustRemoveCategory] = useState(null)
        const [newCategoryName, setNewCategoryName] = useState('')
        const [showAddNewCategoryForm, setShowAddNewCategoryForm] = useState(false)

        const deleteCategory = async ({_id: categoryId}) => {
            const options = new CategoryApi()
            options.deleteCategory(categoryId, token)

            await request(options).then(data => {
                if (data.success) {
                    setCategories(data.categories)
                }
            })
        }
        const addCategory = async (event) => {
            event.preventDefault()

            if (newCategoryName.trim().length > 0) {
                const options = new CategoryApi()
                options.createCategory(newCategoryName, token)

                await request(options).then(data => {
                    if (data.success) {
                        setCategories(data.categories)
                    }
                })
            }

            setShowAddNewCategoryForm(false)
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

        const addClickHandler = () => {
            setNewCategoryName('')
            setShowAddNewCategoryForm(!showAddNewCategoryForm)
        }

        return (
            <Template title='Categories'>
                {isCategoriesLoading ? <CircularProgress/>
                    : <>
                        <Button variant="contained" color="primary" startIcon={<AddIcon/>} onClick={addClickHandler}>
                            Add new category
                        </Button>

                        {categories.length === 0 && !showAddNewCategoryForm &&
                        <Typography style={{paddingTop: '10px'}} variant='body1'>Categories doesn't exist yet</Typography>}

                        {showAddNewCategoryForm &&
                        <ClickAwayListener onClickAway={addClickHandler}>
                            <form style={{paddingTop: '10px'}} noValidate autoComplete="off" onSubmit={addCategory}>
                                <TextField id="outlined-basic" label="Category name" variant="outlined"
                                           value={newCategoryName}
                                           onChange={(event) => setNewCategoryName(event.target.value)}/>
                                <Button style={{width: '150px', height: '100%', margin: '7px'}} color='secondary'
                                        variant='contained'
                                        type='submit' disabled={changingCategory}>Submit</Button>
                            </form>
                        </ClickAwayListener>}

                        {categories.length > 0 &&
                        <CategoriesTable categories={categories} removeClickHandler={removeClickHandler}
                                         setCategories={setCategories}/>
                        }
                    </>}
                <DeleteCategoryConfirm open={mustDialogOpen} dialogCloseHandler={dialogCloseHandler}
                                       deleteHandler={removeCategoryHandler}/>
            </Template>
        );
    }
;

export default Categories;