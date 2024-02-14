import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function PostField(props) {
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const headers = {
            Authorization: `Bearer ${props.accessToken}`,
        };
        
        const postData = {
            title: title,
            text: text
        };

        console.log("headers:", headers);
        console.log("postData:", postData);
        
        axios.post('http://localhost:8000/blogpost/create/', postData, { headers: headers })
        .then(response => {
            console.log("response:", response);
            props.setPostFieldOpen(false);

            // get new blogpost data
            axios.get('http://localhost:8000/blogpost/')
            .then(response => {
            console.log('Blogpost data: ', response.data);

            props.setBlogPostData(response.data);
            })
            .catch(error => {
            console.log('Blogpost data error: ', error);
            });
        })
        .catch(error => console.log("error: ", error));


    };
    
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField label="Title" required onChange={(e) => setTitle(e.target.value)} />
                <TextField label="Content" required onChange={(e) => setText(e.target.value)} multiline rows={4} />
                <Button type="submit" variant="contained">Post</Button>
            </Stack>
        </Box>
    );
}

export default PostField;