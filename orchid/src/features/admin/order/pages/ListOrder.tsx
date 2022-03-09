import { LinearProgress } from "@mui/material";
import orderApi from "api/orderApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Table from "components/Common/table/Table";
import { descData } from "features/admin/Home/pages/Home";
import { Order } from "models/order";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import "./listorder.scss";

type Props = {
  head?: Array<string>;
  dataOrders?: Array<Order>;
  onChangeStatus?: (id: string, status: any) => void;
  loading?: boolean;
  mg?: number;
};
const head = [
  "id",
  "customer",
  "address",
  "name",
  "quantity",
  "weight",
  "total",
  "order Status",
  "actions",
];

const ListOrder = (props: Props) => {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<any>();
  const [newOrder, setNewOrder] = useState<any>("");
  const [render, setRender] = useState<boolean>(false);

  socket?.on("server", (data: any) => {
    if (data._id != newOrder) {
      setNewOrder(data._id);
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await orderApi.getAll();
        setOrder(descData(data.orders));
      } catch (error) {
        console.log("Error: " + error);
      }
    })();
  }, [render, newOrder]);
  console.log("re render");

  const handleDeleteOrder = async (id: string) => {
    try {
      await orderApi.remove(id);
      toast.success("Delete order successfully");
      setRender(!render);
    } catch (error) {
      toast.error("Delete order fail");
    }
  };
  const { onChangeStatus, loading, mg } = props;
  return (
    <div className={`order`} style={{ margin: `20px ${mg}` }}>
      {loading && <LinearProgress />}
      <Table
        head={head}
        dataOrders={order}
        onChangeStatus={onChangeStatus}
        loadingStatus={loading}
        onDeleteOrder={handleDeleteOrder}
      ></Table>
    </div>
  );
};

export default ListOrder;