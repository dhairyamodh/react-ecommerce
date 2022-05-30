import { Box, Button, Card, CardContent, CssBaseline, MenuItem, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { getBrands } from "../redux/actions/brandActions";
import { addProduct } from "../redux/actions/productActions";


const ProductForm = (props) => {

    const [values, setValues] = React.useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector(state => state.all.brands)
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct(values, (res) => {
            if (res.status === 200) {
                navigate('/product-list')
            }
        }))
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    React.useEffect(() => {
        dispatch(getBrands())
    }, [])

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
                        <Typography variant="h5" sx={{ mb: 2 }}>Add Product</Typography>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <TextField sx={{ mb: 2 }} name="name" onChange={(e) => handleChange(e)} fullWidth label="Name" type="text" variant="outlined" />
                            <TextField sx={{ mb: 2 }} name="price" onChange={(e) => handleChange(e)} fullWidth label="Price" type="number" variant="outlined" />
                            <TextField sx={{ mb: 2 }} name="quantity" onChange={(e) => handleChange(e)} fullWidth label="quantity" type="number" variant="outlined" />
                            <TextField
                                name="brand"
                                select
                                fullWidth
                                label="Select brand"
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 2 }}
                            >
                                {data?.map((option) => (
                                    <MenuItem key={option.id || option._id} value={option._id || option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button type="submit" variant="contained">Add</Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Box >
    );
};

export default ProductForm;
