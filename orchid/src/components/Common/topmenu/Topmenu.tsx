import { useAppSelector } from "app/hooks";
import React from "react";
import Dropdown from "../dropdown/Dropdown";
import "./topmenu.scss";
import { ListResponse } from "../../../models/common";
import { User } from "../../../models/user";
type Props = {};

const Topmenu = (props: Props) => {
  let user = localStorage.getItem("currentUser");
  let currentUser;

  if (user) {
    currentUser = JSON.parse(user);
  }

  const userAuth: User = useAppSelector(
    (state) => state.auth.currentUser
  ) as User;

  const userData = ["edit profile"];

  return (
    <div className="topmenu">
      <Dropdown
        name={userAuth?.name || currentUser?.name}
        user={userAuth?.avatar?.url || currentUser?.avatar.url}
        content={userData}
        _id={userAuth?._id || currentUser?._id}
      ></Dropdown>
    </div>
  );
};

export default Topmenu;
