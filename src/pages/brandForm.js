import { Box, Button, Card, CardContent, CssBaseline, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { addBrands, getBrands } from "../redux/actions/brandActions";


const BrandForm = (props) => {
    const [values, setValues] = React.useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBrands(values, (res) => {
            if (res.status === 200) {
                navigate('/brands')
            }
        }))
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 2 }}>Add Brand</Typography>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <TextField sx={{ mb: 2 }} name="name" onChange={(e) => handleChange(e)} fullWidth label="Name" type="text" variant="outlined" />
                            <Button type="submit" variant="contained">Add</Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default BrandForm;
