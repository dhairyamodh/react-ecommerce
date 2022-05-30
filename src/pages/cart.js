import { Box, Button, Card, CardContent, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout, getCart, removeFromCart } from "../redux/actions/cartActions";
import { showSnackBar } from "../redux/actions/snackActions";


const Cart = (props) => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.cart.carts)
    const user = useSelector(state => state.user)
    const handleDelete = (id) => {
        dispatch(removeFromCart(id))
        dispatch(showSnackBar("Item removed from cart", "error"))

        dispatch(getCart())

    }

    const calculateTotal = () => {
        let total = 0;
        data.map(p => {
            total += parseFloat(p.total)
        })
        return total
    }

    const handleCheckout = () => {
        dispatch(checkout({ items: data, userId: user.id || user._id, total: calculateTotal() }))
    }

    React.useEffect(() => {
        dispatch(getCart())
    }, [])

    return (
        <Box sx={{ p: 3 }} >
            <Card>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>Cart</Typography>

                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => {
                                return (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row.quantity}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.brandName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.price}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.total}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Button color="error" onClick={() => handleDelete(row._id || row.id)}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {data.length <= 0 && (
                                <TableRow
                                >
                                    <TableCell colSpan={6}><p style={{ textAlign: 'center' }}>No data found</p></TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell />
                                <TableCell />
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell>{calculateTotal()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Stack flexDirection="row" justifyContent="flex-end">
                        <Button sx={{ mt: 3 }} disabled={data.length <= 0} variant="contained" onClick={() => handleCheckout()}>Checkout</Button>
                    </Stack>
                </CardContent>
            </Card>


        </Box >
    );
};

export default Cart;
