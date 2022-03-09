import AdminLayout from "components/Layout/admin/Admin";
import Login from "features/auth/pages/Login";
import Register from "features/auth/pages/Register";
import React from "react";
import { Route, Routes } from "react-router";
import UserLayout from "./components/Layout/user/User";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login></Login>} />
      <Route path="/admin/register" element={<Register></Register>} />
      <Route path="/admin/*" element={<AdminLayout></AdminLayout>} />
      <Route path="/*" element={<UserLayout></UserLayout>} />
    </Routes>
  );
}
