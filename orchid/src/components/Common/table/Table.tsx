import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import productApi from "api/productApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cartActions } from "features/client/cart/cartSlice";
import { Address, ListParams, Product, User } from "models";
import { Order } from "models/order";
import React, { useState } from "react";
import Popup from "../popup/Popup";
import "./table.scss";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  discount: number;
  weight: number;
  quantity: number;
}

type Props = {
  head: any;
  data?: Product[];
  dataAddress?: Address[];
  dataUser?: User[];
  dataOrders?: Order[];
  dataCart?: CartItem[];
  count?: number | undefined;
  pagination?: (item: number) => void;
  filter?: ListParams;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
  onChangeStatus?: (id: string, status: string) => void;
  onDeleteOrder?: (id: string) => void;
  loadingStatus?: boolean;
  loading?: boolean;
  orderLoading?: boolean;
  addressLoading?: boolean;
};

const Table = (props: Props) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Processing");
  const [idOrder, setIdOrder] = useState<string>("");
  const [idRemove, setIdRemove] = useState<string>("");

  const {
    data,
    head,
    count,
    filter,
    pagination,
    dataAddress,
    dataUser,
    dataOrders,
    dataCart,
    onEditProduct,
    onDeleteProduct,
    onChangeStatus,
    onDeleteOrder,
    loadingStatus,
    orderLoading,
    addressLoading,
  } = props;

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.product.loading);
  const [loadingQtt, setLoadingQtt] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  let totalPage = 0;
  if (count) {
    totalPage = Math.ceil(count / 8);
  }

  const handlePagiantion = (index: number) => {
    if (pagination) {
      pagination(index);
    }
  };

  const handleEditProduct = async (id: string) => {
    if (onEditProduct) {
      await onEditProduct(id);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setIdRemove(id);
    if (onDeleteProduct) {
      await onDeleteProduct(id);
    }
  };

  const handleEditOrder = (id: string) => {
    setPopup(!popup);
    setIdOrder(id);
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    const param = status;
    setPopup(false);

    if (onChangeStatus) {
      await onChangeStatus(idOrder, param);
    }
  };

  const hadleDeleteOrder = async (id: string) => {
    if (onDeleteOrder) {
      await onDeleteOrder(id);
    }
  };

  const handleRemoveCart = (id: string) => {
    if (window.confirm("Remove item ?")) {
      dispatch(cartActions.removeCart(id));
    }
  };

  const handleAddQuantity = async (id: string) => {
    let check = false;
    setLoadingQtt(true);

    try {
      const {
        product: { stock },
      } = await productApi.getById(id);
      setLoadingQtt(false);

      cartItems.forEach(async (item) => {
        if (item._id === id && !check) {
          if (Number(item.weight) * Number(item.quantity) < stock) {
            if (!loadingQtt) {
              dispatch(cartActions.addQuantity(id));
            }
          } else {
            check = true;
            window.alert("quantity exceeds the allowed quantity");
          }
        }
      });
    } catch (error) {
      setLoadingQtt(false);
      console.log(error);
    }
  };

  const handleMinusQuantity = (id: string) => {
    dispatch(cartActions.minusQuantity(id));
  };

  return (
    <>
      {loadingQtt ? (
        <LinearProgress />
      ) : (
        <div className="table">
          <Popup active={popup}>
            <h5 className="popup__heading">Update status</h5>
            <div className="popup__form">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                  name="status"
                >
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Shipping">Shipping</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Refused">Refused</MenuItem>
                </Select>
              </FormControl>
              <button onClick={handleUpdateStatus}>
                {loadingStatus ? (
                  <CircularProgress
                    size={16}
                    sx={{ color: "#fff" }}
                  ></CircularProgress>
                ) : (
                  "Cập nhật"
                )}
              </button>
            </div>
            <div className="popup__close-icon" onClick={() => setPopup(false)}>
              <CloseIcon></CloseIcon>
            </div>
          </Popup>
          <div style={{ width: "100%" }}>{loading && <LinearProgress />}</div>
          <table>
            <thead>
              <tr>
                {head.map((item: any, index: number) => {
                  if (item.includes("action")) {
                    return (
                      <th colSpan={2} key={index}>
                        {item}
                      </th>
                    );
                  } else {
                    return <th key={index}>{item}</th>;
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item: Product, index: number) => {
                  return (
                    <tr key={index}>
                      <>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                          <img
                            src={item.images[0].url}
                            alt={item.name}
                            className="img"
                          />
                        </td>
                        <td>{item.weight}</td>
                        <td>{item.category}</td>
                        <td>{item.stock}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEditProduct(item._id)}
                        >
                          <span className="table-edit">Sửa</span>
                        </td>
                        {loading && idRemove === item._id ? (
                          <td>Đang xóa...</td>
                        ) : (
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteProduct(item._id)}
                          >
                            <span className="table-delete">Xóa</span>
                          </td>
                        )}
                      </>
                    </tr>
                  );
                })}
              {loadingStatus && (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      background: "#fff",
                      padding: 0,
                      maxHeight: "30px",
                    }}
                  >
                    <LinearProgress />
                  </td>
                </tr>
              )}
              {dataOrders &&
                dataOrders.map((item: Order, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.shippingInfo.name}</td>
                      <td>{item.shippingInfo.address}</td>
                      <td>{item.orderItems[0].name}</td>
                      <td>{item.orderItems[0].quantity}</td>
                      <td>{item.orderItems[0].weight}</td>
                      <td>{item.itemsPrice}</td>
                      <td>
                        <span className={item.orderStatus}>
                          {item.orderStatus}
                        </span>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditOrder(item._id)}
                      >
                        <span className="table-edit">Sửa</span>
                      </td>
                      {orderLoading ? (
                        <td></td>
                      ) : (
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => hadleDeleteOrder(item._id)}
                        >
                          <span className="table-delete">Xóa</span>
                        </td>
                      )}
                    </tr>
                  );
                })}
              {addressLoading && (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      background: "#fff",
                      padding: 0,
                      maxHeight: "30px",
                    }}
                  >
                    <LinearProgress />
                  </td>
                </tr>
              )}
              {dataAddress &&
                dataAddress.map((item: Address, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.user}</td>
                      <td>{item.company}</td>

                      <td>{item.address}</td>
                      <td>{item.phoneNumber}</td>
                    </tr>
                  );
                })}
              {dataUser &&
                dataUser.map((item: User, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>

                      <td>
                        <img
                          src={item.avatar?.url}
                          alt={item.name}
                          className="img"
                        />
                      </td>
                      <td>{item.role}</td>
                    </tr>
                  );
                })}
              {dataCart &&
                dataCart.map((item: CartItem, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>
                        <img src={item.image} alt={item.name} width="60px" />
                      </td>
                      <td>{item.price}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "80px",
                          width: "100px",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <RemoveIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleMinusQuantity(item._id)}
                          ></RemoveIcon>
                        </span>
                        {item.quantity}
                        <span>
                          <AddIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleAddQuantity(item._id)}
                          ></AddIcon>
                        </span>
                      </td>
                      <td>{item.weight} kg</td>
                      <td>{item.discount}%</td>
                      <td>
                        {(
                          ((item.price * (100 - item.discount)) / 100) *
                          item.quantity
                        ).toFixed(3)}
                        đ
                      </td>
                      <td onClick={() => handleRemoveCart(item._id)}>
                        <span className="table-delete">Xóa</span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="pagination">
            <ul className="pagination__list">
              {Array.from(new Array(totalPage)).map((_, index) => (
                <li
                  className={`pagination__list-item ${
                    filter?.page == index + 1 ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => handlePagiantion(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
