import { Box, Button, Card, CardContent, CssBaseline, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { deleteProduct, getAllProducts } from "../redux/actions/productActions";
import Table from "../components/Table"



const ProductForm = (props) => {
    const tabelHeaders = [
        {
            id: 'name',
            label: 'Name',
        },
        {
            id: 'price',
            label: 'Price',
        },
        {
            id: 'quantity',
            label: 'Quantity',
        },
        {
            id: 'brandName',
            label: 'Brand',
        },
    ];
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const data = useSelector(state => state.all.products)


    const handleDelete = (id) => {
        dispatch(deleteProduct(id, (res) => {
            dispatch(getAllProducts())
        }))
    }
    React.useEffect(() => {
        dispatch(getAllProducts())
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
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Button onClick={() => navigate('/add-product')} variant="contained">Add</Button>
                        </Stack>
                        <Table rows={data} title="Products" showActions={true} onDelete={(row) => handleDelete(row._id || row.id)} tableHeaders={tabelHeaders} />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default ProductForm;
