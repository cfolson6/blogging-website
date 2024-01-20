import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function LoginModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <div>
            <Button onClick={handleOpen} color="inherit">Login</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style} component="form" noValidate autoComplete='off'>
                    <Stack spacing={2}>
                        <Typography variant="h4" gutterBottom>Log In</Typography>
                        <Typography variant="p1" gutterBottom>
                            Enter your username and password.
                        </Typography>
                        <TextField label="Username"/>
                        <TextField label="Password"/>
                        <Button variant="contained">Log In</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

export default LoginModal;