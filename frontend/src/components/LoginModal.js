import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

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
    const handleClose = () => {
        
        setOpen(false);
    }

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Username: ', username);
        console.log('Password: ', password);

        axios.post('http://localhost:8000/login/', {username: username, password: password})
        .then(response => {
            console.log(response);
            props.setAccessToken(response.data.access);
            props.setRefreshToken(response.data.refresh);
            e.target.reset();
            handleClose();
        })
        .catch(error => console.log('Login error: ', error));
    }
    
    return (
        <div>
            <Button onClick={handleOpen} color="primary" variant="outlined">Login</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style} component="form" noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{alignItems: 'center'}}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h4" gutterBottom>Log In</Typography>
                        <Typography variant="p1" gutterBottom>
                            Enter your username and password.
                        </Typography>
                        <TextField label="Username" required onChange={(e) => setUsername(e.target.value)} fullWidth/>
                        <TextField label="Password" required onChange={(e) => setPassword(e.target.value)} type="password" fullWidth/>
                        <Button variant="contained" type="submit" fullWidth>Log In</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

export default LoginModal;