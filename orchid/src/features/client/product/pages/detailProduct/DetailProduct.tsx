import { Grid, LinearProgress, Paper } from "@mui/material";
import productApi from "api/productApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cartActions } from "features/client/cart/cartSlice";
import { Images, ListResponse, Product } from "models";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { QuantityField } from "../../../../../components/form-controls/QuantityField";
import "./detailproduct.scss";
type Props = {};

const DetailProduct = (props: Props) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const { id } = useParams();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const fetchProductDetail = async (id: string) => {
    const res: ListResponse<Product> = await productApi.getById(id);
    return res;
  };

  const DetailProduct = useQuery(["productDetail", id], () =>
    fetchProductDetail(id as string)
  );

  const { isLoading, error, data } = DetailProduct;

  if (isLoading)
    return (
      <div style={{ marginTop: "10px" }}>
        <LinearProgress />
      </div>
    );

  if (error) return <div>error</div>;

  const handleFormSubmit = async (values: any) => {
    values.quantity = Number.parseInt(values.quantity);

    if (data) {
      values._id = data.product._id;
      values.name = data.product.name;
      values.price = Number.parseInt(data.product.price);
      values.image = data.product.images[0].url;
      values.discount = Number.parseInt(data.product.discount);
      values.weight = Number.parseFloat(data.product.weight);
    }

    if (
      Number.parseInt(values.quantity) *
        Number.parseInt(data?.product.weight) <=
      data?.product.stock
    ) {
      let check = false;

      cartItems.forEach(async (item) => {
        if (item._id === id) {
          if (
            Number(item.weight) * Number(item.quantity) <
            data?.product.stock
          ) {
            dispatch(cartActions.addToCart(values));
            check = true;
          } else {
            check = true;
            window.alert("quantity exceeds the allowed quantity ");
          }
        }
      });

      if (!check) {
        dispatch(cartActions.addToCart(values));
      }
    } else {
      window.alert("quantity exceeds the allowed quantity");
    }
  };

  return (
    <div className="detail-product">
      <Grid container spacing={1}>
        <Grid item sm={4}>
          <Paper
            sx={{ padding: "20px" }}
            elevation={0}
            className="detail-product__left"
          >
            {data &&
              data.product.images.map((item: Images, index: number) => {
                return <img key={index} src={item.url} alt="" width="40%" />;
              })}
          </Paper>
        </Grid>
        <Grid item sm={8}>
          <Paper
            sx={{ padding: "20px" }}
            elevation={0}
            className="detail-product__right"
          >
            <p className="detail-product__right-name">
              name: {data?.product?.name}
            </p>
            <p className="detail-product__right-name">
              weight: {data?.product?.weight} {data?.product?.unit}
            </p>
            <strong
              style={{ fontWeight: "700" }}
              className="detail-product__right-price"
            >
              price: {data?.product.price}.000đ
              {data?.product.discount != "0" && (
                <span className="detail-product__right-price-discount">
                  {data?.product.discount + "%"}
                </span>
              )}
            </strong>
            <div className="detail-product__right-quantity-form">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <QuantityField
                  id="quantity"
                  name="quantity"
                  control={control}
                  type="number"
                  setValue={setValue}
                ></QuantityField>
                <button
                  className="detail-product__right-quantity-form-add-cart"
                  type="submit"
                >
                  Add to cart
                </button>
              </form>
            </div>
          </Paper>
        </Grid>
        <h2 style={{ margin: "20px 0 10px 8px" }}>Product description</h2>
        <div
          className="detail-product-description"
          dangerouslySetInnerHTML={{ __html: data?.product.description }}
        ></div>
      </Grid>
    </div>
  );
};

export default DetailProduct;
