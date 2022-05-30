import { Button, Card, CardContent, Link, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/userActions";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
        margin: '0 auto',
        padding: 40
    },
}));


const Login = (props) => {
    const classes = useStyles()
    const [values, setValues] = React.useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(values, (res) => {
            if (res.status === 200) {
                navigate('/')
            }
        }))

    }
    const handleChange = (name, e) => {
        setValues({ ...values, [name]: e.target.value })
    }
    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <TextField sx={{ mb: 2 }} onChange={(e) => handleChange('email', e)} fullWidth label="Email" type="email" variant="outlined" />
                        <TextField sx={{ mb: 2 }} onChange={(e) => handleChange('password', e)} fullWidth label="password" type="password" variant="outlined" />
                        <Button type="submit" variant="contained">Login</Button>
                    </form>
                    <Button onClick={() => navigate('/register')} type="button">Create an account</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
