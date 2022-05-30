import { Box, Button, Card, CardActionArea, CardActions, CardContent, Checkbox, CssBaseline, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/actions/brandActions";
import { addToCart } from "../redux/actions/cartActions";
import { getAllProducts } from "../redux/actions/productActions";
import { showSnackBar } from "../redux/actions/snackActions";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20
    },
}));


const Home = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const { products, brands } = useSelector(state => state.all)
    const [productData, setProductData] = React.useState([])
    const [selected, setSelected] = React.useState([])
    const handleAddCart = (data) => {
        dispatch(addToCart(data))
        dispatch(showSnackBar("Item added into cart"))
    }
    const filterProduct = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        let filter = products.filter(each => {
            return newSelected.includes(each.brand)
        });
        setProductData(filter)
    }
    React.useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getBrands())
    }, [])
    React.useEffect(() => {
        setProductData(products)
        const selected = brands.map(b => b.id || b._id)
        setSelected(selected)
    }, [products])
    console.log('data', selected['6294a4332fb0d0d99018a0c8']);
    const ProductCard = (props) => {
        const { name, price, onAddCart } = props
        return (
            <>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ${price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="outlined" color="primary" onClick={onAddCart}>
                            Add to cart
                        </Button>
                    </CardActions>
                </Card>
            </>
        )
    }

    return (
        <Box
            component="main"
            className={classes.root}
        >
            <Grid container spacing={2}>
                <Grid item lg={2}>
                    <Card>
                        <CardContent>
                            <Typography>Brands</Typography>
                            <FormGroup>
                                {brands?.map((b, i) => {
                                    return (
                                        <FormControlLabel key={i} control={<Checkbox checked={selected.indexOf(b.id || b._id) !== -1} onChange={(e) => filterProduct(e, b.id || b._id)} />} label={b.name} />
                                    )
                                })}
                            </FormGroup>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={10}>

                    <Grid container spacing={2}>
                        {
                            productData?.map((p, i) => {
                                return (
                                    <Grid item lg={3} key={i}>
                                        <ProductCard onAddCart={() => handleAddCart(p)} {...p} />
                                    </Grid>
                                )
                            })
                        }

                    </Grid>
                </Grid>
            </Grid>
        </Box>

    );
};

export default Home;
