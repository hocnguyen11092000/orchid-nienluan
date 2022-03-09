import Login from "features/auth/pages/Login";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
interface Props {}

const ProtectedRoute = (props: Props) => {
  const currentUser: any = localStorage.getItem("currentUser");

  const { role } = JSON.parse(currentUser);

  const currentUserRedux: any = useAppSelector(
    (state) => state.auth.currentUser
  );
  return currentUserRedux?.role == "admin" || role == "admin" ? (
    <Outlet></Outlet>
  ) : (
    <Login></Login>
  );
};

export default ProtectedRoute;
