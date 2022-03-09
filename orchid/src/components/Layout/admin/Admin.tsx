import React from "react";
import ProtectedRoute from "components/Common/protected-route/ProtectedRoute";
import Topmenu from "components/Common/topmenu/Topmenu";
import Address from "features/admin/address/Address";
import Home from "features/admin/Home/pages/Home";
import ListOrder from "features/admin/order/pages/ListOrder";
import AddEdit from "features/admin/products/pages/add-edit/AddEdit";
import ListProduct from "features/admin/products/pages/ListProduct";
import AddEditUser from "features/admin/user/pages/add-edit/AddEditUser";
import FogotPassword from "features/admin/user/pages/fogot-password/FogotPassword";
import ListUser from "features/admin/user/pages/list-user/ListUser";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../Common/sidebar/Sidebar";
import "./admin.scss";

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <div className="wrapper">
      <Sidebar></Sidebar>
      <div className="main">
        <Topmenu></Topmenu>
        <Routes>
          <Route
            path="/password/reset/:token"
            element={<FogotPassword></FogotPassword>}
          ></Route>
          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/" element={<Home></Home>}></Route>
            {/* product */}
            <Route
              path="/productList"
              element={<ListProduct></ListProduct>}
            ></Route>
            <Route
              path="/add-edit-product/add"
              element={<AddEdit></AddEdit>}
            ></Route>
            <Route
              path="/add-edit-product/:id"
              element={<AddEdit></AddEdit>}
            ></Route>
            {/* address */}
            <Route path="/address" element={<Address></Address>}></Route>
            {/* user */}
            <Route path="/userList" element={<ListUser></ListUser>}></Route>
            <Route
              path="/add-edit-user/"
              element={<AddEditUser></AddEditUser>}
            ></Route>
            <Route
              path="/add-edit-user/:id"
              element={<AddEditUser></AddEditUser>}
            ></Route>
            {/* order */}
            <Route path="/orderList/" element={<ListOrder></ListOrder>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
