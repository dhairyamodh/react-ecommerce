import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { register } from "../redux/actions/userActions";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
        margin: '0 auto',
        padding: 40
    },
}));


const Register = (props) => {
    const classes = useStyles()
    const [values, setValues] = React.useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(values, (res) => {
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
                    <Typography variant="h5" sx={{ mb: 2 }}>Register</Typography>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <TextField sx={{ mb: 2 }} onChange={(e) => handleChange('name', e)} fullWidth label="Name" type="text" variant="outlined" />
                        <TextField sx={{ mb: 2 }} onChange={(e) => handleChange('email', e)} fullWidth label="Email" type="email" variant="outlined" />
                        <TextField sx={{ mb: 2 }} onChange={(e) => handleChange('password', e)} fullWidth label="password" type="password" variant="outlined" />
                        <Button type="submit" variant="contained">Register</Button>

                    </form>
                    <Button onClick={() => navigate('/login')} type="button">Sign In</Button>

                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
