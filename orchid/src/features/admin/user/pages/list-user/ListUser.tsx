import { useAppDispatch, useAppSelector } from "app/hooks";
import Table from "components/Common/table/Table";
import { ListParams, User } from "models";
import React, { useEffect } from "react";
import { fetchUser } from "../../userSlice";
import "./listuser.scss";

type Props = {};

const ListUser = (props: Props) => {
  const filter: ListParams = useAppSelector((state) => state.user.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser(filter));
  }, [dispatch, filter]);

  const head = ["id", "name", "email", "avatar", "role"];
  const user: User[] = useAppSelector((state) => state.user.list);
  return (
    <div className="address">
      <h2 className="address__heading">List user</h2>
      <div className="table">
        <Table head={head} dataUser={user} filter={filter}></Table>
      </div>
    </div>
  );
};

export default ListUser;
