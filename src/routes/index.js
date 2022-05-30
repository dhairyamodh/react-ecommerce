import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrandForm from "../pages/brandForm";
import BrandList from "../pages/brandList";
import Home from "../pages/Home";
import Login from "../pages/login";
import ProductForm from "../pages/productForm";
import ProductList from "../pages/productsList";
import Register from "../pages/register";
import checkIfAppReady from "../helpers/checkIfAppReady"
import Appbar from "../components/appbar";
import Cart from "../pages/cart";
import SnackComponent from "../components/SnackComponent";

const AppRoutes = () => {
    const ready = checkIfAppReady();
    return (
        <>
            <BrowserRouter>
                <Appbar />
                <SnackComponent />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/add-product" element={<ProductForm />} />
                    <Route path="/brands" element={<BrandList />} />
                    <Route path="/add-brand" element={<BrandForm />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes