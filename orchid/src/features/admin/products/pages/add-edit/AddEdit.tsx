import productApi from "api/productApi";
import AddEditForm from "features/admin/products/components/Add-edit-Form/AddEditForm";
import { Product } from "models";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./addedit.scss";
type Props = {};

export interface InitValues {
  name: string;
  description: string;
  price: number;
  discount: number;
  weight: number;
  category: string;
  stock: number;
  [key: string]: any;
}

const AddEdit = (props: Props) => {
  const [product, setProduct] = useState<Product>();

  const params = useParams();
  const { id } = params;

  const isEdit = Boolean(id);

  useLayoutEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await productApi.getById(id);
        setProduct(data.product);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();
  }, [id]);

  const initialValues = {
    name: "",
    description: "",
    price: 0,
    discount: 0,
    weight: 0,
    category: "",
    stock: 0,
    ...product,
  } as Product;

  const naviage = useNavigate();

  const handleSubmit = async (values: any) => {
    const myForm: FormData = new FormData();
    myForm.append("name", values.name);
    myForm.append("price", values.price.toString());
    myForm.append("description", values.description);
    myForm.append("stock", values.stock.toString());
    myForm.append("weight", values.weight.toString());
    myForm.append("category", values.category);
    myForm.append("discount", values.discount.toString());
    values.images.forEach((image: any) => {
      myForm.append("images", image);
    });

    if (!isEdit) {
      try {
        await productApi.add(myForm);
        toast.success("Add product successfully");
        naviage("/admin/productList");
      } catch (error) {
        toast.error("error: " + error);
      }
    } else {
      if (id) {
        try {
          await productApi.update(id, myForm);
          toast.success("Update product successfully");
          naviage("/admin/productList");
        } catch (error) {
          toast.error("Update product fail");
        }
      }
    }
  };
  return (
    <div className="add-edit">
      {(!isEdit || Boolean(product)) && (
        <AddEditForm init={initialValues} onSubmit={handleSubmit}></AddEditForm>
      )}
    </div>
  );
};

export default AddEdit;
