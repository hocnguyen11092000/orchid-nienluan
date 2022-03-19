import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/hooks";
import { addUser } from "features/admin/user/userSlice";
import RegisterForm from "features/auth/components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.scss";

type Props = {};

const Register = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async (values: any) => {
    const myForm = new FormData();

    myForm.append("name", values.name);
    myForm.append("email", values.email);
    myForm.append("password", values.password);

    myForm.append("avatar", values.avatar);

    try {
      const result = await dispatch(addUser(myForm));
      unwrapResult(result);

      toast.success("Register successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Register error");
    }
  };

  return (
    <div className="login">
      <RegisterForm onSubmit={handleFormSubmit}></RegisterForm>
    </div>
  );
};

export default Register;
