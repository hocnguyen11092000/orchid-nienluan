import { useAppDispatch, useAppSelector } from "app/hooks";
import Table from "components/Common/table/Table";
import { Address, ListParams } from "models";
import React, { useEffect } from "react";
import "./address.scss";
import { fetchAddress, setFilter } from "./addressSlice";

type Props = {};

const AddressPage = (props: Props) => {
  const filter: ListParams = useAppSelector((state) => state.address.filter);
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.address.addressCount);

  useEffect(() => {
    dispatch(fetchAddress(filter));
  }, [dispatch, filter]);

  const handlePagination = (page: number) => {
    dispatch(setFilter({ ...filter, page }));
  };

  const head = ["id", "user", "company", "address", "phoneNumber"];
  const address: Address[] = useAppSelector((state) => state.address.list);
  const loadingAddress = useAppSelector((state) => state.address.loading);

  return (
    <div className="address">
      <h2 className="address__heading">List address</h2>
      <div className="table">
        <Table
          head={head}
          dataAddress={address}
          filter={filter}
          count={count}
          pagination={handlePagination}
          addressLoading={loadingAddress}
        ></Table>
      </div>
    </div>
  );
};

export default AddressPage;
