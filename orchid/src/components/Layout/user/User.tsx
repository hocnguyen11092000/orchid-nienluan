import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppSelector } from "app/hooks";
import Cart from "features/client/cart/Cart";
import CheckOut from "features/client/checkout/CheckOut";
import DetailProduct from "features/client/product/pages/detailProduct/DetailProduct";
import ListProduct from "features/client/product/pages/listProduct/ListProduct";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

type Props = {};

const UserLayout = (props: Props) => {
  const cart = useAppSelector((state) => state.cart.cartItems);
  let count = 0;

  cart.forEach((item) => (count += item.quantity));
  return (
    <>
      <AppBar position="static" sx={{ background: "#349eff" }}>
        <Toolbar sx={{ paddingLeft: "0 !important" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Typography
            sx={{ color: "#fff", flexGrow: 1 }}
            variant="h6"
            component="div"
          >
            <Link to="/" style={{ color: "#fff" }}>
              Orchid
            </Link>
          </Typography>

          <Link to="/cart">
            <IconButton sx={{ color: "#fff" }}>
              <Badge badgeContent={count} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Button color="inherit" size="small">
            <Link to="/admin/login" style={{ color: "#fff" }}>
              LOGIN
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        {/* <Route element={<ProtectedRoute></ProtectedRoute>}> */}
        {/* product */}
        <Route path="/" element={<ListProduct></ListProduct>}></Route>
        <Route path="/checkout" element={<CheckOut></CheckOut>}></Route>
        <Route
          path="/product/:id"
          element={<DetailProduct></DetailProduct>}
        ></Route>
        {/* cart */}
        <Route path="/cart" element={<Cart></Cart>}></Route>
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default UserLayout;
