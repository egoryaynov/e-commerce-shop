import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ColorPicker from "material-ui-color-picker";

const AddColorPopup = ({open, handleClosePopup}) => {
    const [name, setName] = useState('')
    const [hex, setHex] = useState('#000')

    const handleAdd = () => {
        handleClosePopup(name, hex)
        resetForm()
    }
    const handleCancel = () => {
        handleClosePopup()
        resetForm()
    }
    const resetForm = () => {
        setName('')
        setHex('#000')
    }

    return (
        <div>
            <Dialog fullWidth maxWidth='md' open={open}
                    onClose={handleAdd}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add color</DialogTitle>
                <DialogContent style={{height: '400px'}}>
                    <DialogContentText>
                        To add new color to product, please, provide name of color and HEX
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        fullWidth
                    />
                    <ColorPicker
                        required
                        name='color'
                        defaultValue='#000'
                        value={hex}
                        onChange={color => setHex(color)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={name.length === 0 || hex.length === 0} onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddColorPopup;
