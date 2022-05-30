import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
export default function Appbar() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart.carts)
    const dispatch = useDispatch()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                    <IconButton
                        size="large"
                        onClick={() => navigate('/cart')}
                        color="inherit"
                    >
                        <Badge badgeContent={cart.length} color="error">
                            <CartIcon />
                        </Badge>
                    </IconButton>

                    {!user.isLogged ? <Button color="inherit" onClick={() => navigate('/login')}>Login</Button> : <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>}
                    <Button color="inherit" onClick={() => navigate('/product-list')}>Go to admin</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}