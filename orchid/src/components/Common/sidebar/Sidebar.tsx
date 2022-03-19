import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const subRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const userRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const orderRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const addressRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { pathname } = useLocation();

  const handleActive = (el: any) => {
    el.current.classList.toggle("active");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link to="/admin">
          <img src="https://nguoinoitieng.tv/images/nnt/96/0/bbi0.jpg" alt="" />
        </Link>
      </div>
      <div className="sidebar__menu">
        <ul className="sidebar__menu-list">
          <li
            className={`sidebar__menu-item ${
              pathname.includes("product") ? "active" : ""
            }`}
            onClick={() => handleActive(subRef)}
          >
            <div className="sidebar__menu-item-heading">
              <FolderOpenIcon></FolderOpenIcon>
              <span>Product</span>
            </div>
            <div ref={subRef} className="sidebar__menu-item-product">
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/admin/productList">List Product</Link>
              </span>
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/admin/add-edit-product/add">Add Product</Link>
              </span>
            </div>
          </li>
          <li
            className={`sidebar__menu-item ${
              pathname.includes("address") ? "active" : ""
            }`}
            onClick={() => handleActive(addressRef)}
          >
            <div className="sidebar__menu-item-heading">
              <FolderOpenIcon></FolderOpenIcon>
              <span>Address</span>
            </div>
            <div ref={addressRef} className="sidebar__menu-item-product">
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/admin/address">List Address</Link>
              </span>
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/admin/address">Add Address</Link>
              </span>
            </div>
          </li>
          <li
            className={`sidebar__menu-item ${
              pathname.includes("user") ? "active" : ""
            }`}
            onClick={() => handleActive(userRef)}
          >
            <div className="sidebar__menu-item-heading">
              <FolderOpenIcon></FolderOpenIcon>
              <span>User</span>
            </div>
            <div ref={userRef} className="sidebar__menu-item-product">
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/admin/userList">List User</Link>
              </span>
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/admin/add-edit-user">Add User</Link>
              </span>
            </div>
          </li>
          <li
            className={`sidebar__menu-item ${
              pathname.includes("order") ? "active" : ""
            }`}
            onClick={() => handleActive(orderRef)}
          >
            <div className="sidebar__menu-item-heading">
              <FolderOpenIcon></FolderOpenIcon>
              <span>Order</span>
            </div>
            <div ref={orderRef} className="sidebar__menu-item-product">
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/admin/orderList">List Order</Link>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
