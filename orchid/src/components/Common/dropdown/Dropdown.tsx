import { useAppDispatch } from "app/hooks";
import { logout } from "features/auth/authSlice";
import { MutableRefObject, Ref, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./dropdown.scss";

type Props = {
  user?: string;
  content?: Array<string>;
  name?: string;
  icon?: any;
  _id?: string;
};

const clickOutSide = (
  toggleRef: MutableRefObject<HTMLDivElement>,
  contentRef: MutableRefObject<HTMLDivElement>
) => {
  document.addEventListener("mousedown", (e: any) => {
    if (toggleRef?.current && toggleRef.current.contains(e.target)) {
      contentRef.current.classList.toggle("active");
    } else {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        contentRef.current.classList.remove("active");
      }
    }
  });
};

const Dropdown = (props: Props) => {
  const dispatch = useAppDispatch();
  const toggleRef = useRef<HTMLDivElement>(null) as any;
  const contentRef = useRef<HTMLDivElement>(null) as any;

  clickOutSide(toggleRef, contentRef);

  return (
    <div className="dropdown">
      <div className="User" ref={toggleRef}>
        {props.user ? (
          <>
            <img src={props?.user} alt="" className="dropdown__img" />
            <span className="dropdown__name">{props?.name}</span>
          </>
        ) : (
          "Vui lòng đăng nhập"
        )}
      </div>

      <div className="dropdown__content" ref={contentRef}>
        {props.user && (
          <ul className="dropdown__content-list">
            <li className="dropdown__content-item">
              <span>
                <NavLink to={`add-edit-user/${props?._id}`}>
                  edit profile
                </NavLink>
              </span>
            </li>
            <li className="dropdown__content-item">
              {localStorage.getItem("token") ? (
                <span onClick={() => dispatch(logout())}>Logout</span>
              ) : (
                <NavLink to="/admin/login">Login</NavLink>
              )}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
