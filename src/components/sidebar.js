import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
    const navigate = useNavigate()
    return (
        <>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>

                    <ListItem key={"products"} disablePadding>
                        <ListItemButton onClick={() => navigate('/product-list')}>
                            <ListItemText primary={"Products"} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    <ListItem key={"brands"} disablePadding>
                        <ListItemButton onClick={() => navigate('/brands')}>
                            <ListItemText primary={"Brands"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

        </>
    );
}