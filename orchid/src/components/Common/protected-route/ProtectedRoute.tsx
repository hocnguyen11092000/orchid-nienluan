import Login from "features/auth/pages/Login";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
interface Props {}

const ProtectedRoute = (props: Props) => {
  const currentUser: any = localStorage.getItem("currentUser");
  const currentUserRedux: any = useAppSelector(
    (state) => state.auth.currentUser
  );

  if (!currentUser) {
    return <Login></Login>;
  }
  const { role } = JSON.parse(currentUser);

  return currentUserRedux?.role == "admin" ||
    currentUserRedux?.role == "staff" ||
    role == "admin" ||
    role == "staff" ? (
    <Outlet></Outlet>
  ) : (
    <Login></Login>
  );
};

export default ProtectedRoute;
