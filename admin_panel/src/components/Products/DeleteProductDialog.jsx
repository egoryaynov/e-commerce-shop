import React from 'react';
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";

const DeleteProductDialog = ({open, handleDelete, handleDialogClose: handleClose}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You really want to delete product ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteProductDialog;
