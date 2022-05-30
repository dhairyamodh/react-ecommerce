import { Box, Button, Card, CardContent, CssBaseline, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { deleteBrand, getBrands } from "../redux/actions/brandActions";
import Table from "../components/Table"



const BrandList = (props) => {
    const tabelHeaders = [
        {
            id: 'name',
            label: 'Name',
        },

    ];
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector(state => state.all.brands)

    const handleDelete = (id) => {
        dispatch(deleteBrand(id, (res) => {
            dispatch(getBrands())
        }))
    }
    React.useEffect(() => {
        dispatch(getBrands())
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }} >
                <Card>
                    <CardContent>
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Button onClick={() => navigate('/add-brand')} variant="contained">Add</Button>
                        </Stack>
                        <Table rows={data} title="Brands" showActions={true} onDelete={(row) => handleDelete(row._id || row.id)} tableHeaders={tabelHeaders} />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default BrandList;
