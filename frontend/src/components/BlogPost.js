import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


function BlogPost(props) {
    return(<React.Fragment>
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {props.username}
                </Typography>
                <Divider />
                <Typography variant="h6" gutterBottom>
                    {props.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {props.text}
                </Typography>
            </CardContent>
        </Card>
    </React.Fragment>);
}

export default BlogPost;