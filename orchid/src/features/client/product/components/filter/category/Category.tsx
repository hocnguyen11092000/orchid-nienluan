import productApi from "api/productApi";
import { Category, ListResponse } from "models";
import React from "react";
import { useQuery } from "react-query";

type Props = {
  onChange?: (value: string) => void;
  isChoosed?: string;
};

const CategoryFc = (props: Props) => {
  const { onChange, isChoosed } = props;

  const fetchCategory = async () => {
    const res: ListResponse<Category> = await productApi.getAllCategory();
    return res;
  };

  const { isLoading, error, data } = useQuery<
    ListResponse<Category>,
    ErrorConstructor
  >("fetchCategory", fetchCategory);

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>error</div>;

  const handleChangeCategory = (item: string) => {
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <ul className="category-list">
      {data?.category?.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => handleChangeCategory(item)}
            className={isChoosed === item ? "active" : ""}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryFc;
