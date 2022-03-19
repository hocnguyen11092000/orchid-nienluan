import { LinearProgress } from "@mui/material";
import orderApi from "api/orderApi";
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
  onChangeStatus?: (id: string, status: string) => void;
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
  const { onChangeStatus, loading, mg } = props;
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  const [order, setOrder] = useState<Order[]>();
  const [newOrder, setNewOrder] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);

  socket?.on("server", (data: Order) => {
    if (data._id != newOrder) {
      setNewOrder(data._id);
    }
  });

  useEffect(() => {
    (async () => {
      setOrderLoading(true);
      try {
        const data = await orderApi.getAll();
        setOrderLoading(false);
        setOrder(descData(data.orders));
      } catch (error) {
        setOrderLoading(false);
        console.log("Error: " + error);
      }
    })();
  }, [render, newOrder]);
  console.log("re render");

  const handleDeleteOrder = async (id: string) => {
    setOrderLoading(true);
    try {
      await orderApi.remove(id);
      toast.success("Delete order successfully");
      setOrderLoading(false);
      setRender(!render);
    } catch (error) {
      toast.error("Delete order fail");
      setOrderLoading(false);
    }
  };

  return (
    <div className={`order`} style={{ margin: `20px ${mg}` }}>
      <div style={{ padding: "10px 0" }}>
        {orderLoading && <LinearProgress />}
      </div>
      <Table
        head={head}
        dataOrders={order}
        onChangeStatus={onChangeStatus}
        loadingStatus={loading}
        orderLoading={orderLoading}
        onDeleteOrder={handleDeleteOrder}
      ></Table>
    </div>
  );
};

export default ListOrder;
