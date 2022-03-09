import { CircularProgress } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { InputField } from "components/form-controls/InputFields";
import { User } from "models";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

type Props = {
  onSubmit?: (values: User) => void;
  init?: any;
};

const RegisterForm = (props: Props) => {
  const loading = useAppSelector((state) => state.user.loading);
  const [avatar, setAvatar] = useState<any>();
  const [avatarPreview, setAvatarPreview] = useState<any>();
  const { onSubmit, init } = props;
  const { id } = useParams();

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      comfirmPassword: "",
    },
  });

  const handleImageChange = (e: any) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (values: User) => {
    values.avatar = avatar;

    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__title">
        <h3>REGISTER FORM</h3>
      </div>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="add-edit-user__form-group">
          <label htmlFor="name">Name:</label>
          <InputField
            control={control}
            id="name"
            name="name"
            placeholder="Nhập tên..."
            mWidth={250}
          ></InputField>
        </div>
        <div className="add-edit-user__form-group">
          <label htmlFor="email">Email:</label>
          <InputField
            control={control}
            id="email"
            name="email"
            placeholder="Nhập email..."
            mWidth={250}
          ></InputField>
        </div>
        {!id && (
          <>
            <div className="add-edit-user__form-group">
              <label htmlFor="password">Password:</label>
              <InputField
                control={control}
                id="password"
                name="password"
                placeholder="Nhập password..."
                mWidth={250}
              ></InputField>
            </div>
            <div className="add-edit-user__form-group">
              <label htmlFor="confirmPassword">Comfirm password:</label>
              <InputField
                control={control}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Nhập confirmPassword..."
                mWidth={250}
              ></InputField>
            </div>
          </>
        )}
        <div className="add-edit-user__form-group">
          <label htmlFor="avatar">Avatar:</label>
          <input
            name="avatar"
            type="file"
            multiple
            id="avatar"
            onChange={handleImageChange}
          />
        </div>
        <div className="avatar">
          {init && (
            <img
              crossOrigin="anonymous"
              id="imageid"
              src={init?.avatar?.url}
              alt=""
              width={100}
            />
          )}
        </div>
        <div className="add-edit-user__form-group">
          <button type="submit">
            {loading ? (
              <CircularProgress
                size={16}
                sx={{ color: "#fff" }}
              ></CircularProgress>
            ) : id ? (
              "Edit user"
            ) : (
              "Register"
            )}
          </button>
          <span style={{ marginLeft: "10px", fontSize: "0.8rem" }}>
            Already have an account <Link to="/admin/login">Login here</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
