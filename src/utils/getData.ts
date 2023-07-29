import axios from "axios";
import { ProductsProps } from "../interfaces";

type Callback = (data: ProductsProps[]) => void;

export const getProducts = async (
  callback: Callback,
  setErrorMessage: (message: string) => void
) => {
  const url: string = import.meta.env.VITE_API_URL;
  axios
    .get<ProductsProps[]>(url)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
};

export const getCategories = async (callback: Callback, category: string) => {
  const url: string = `${import.meta.env.VITE_API_URL}/category/${category}`;
  axios
    .get<ProductsProps[]>(url)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getDetailProduct = async (
  callback: (data: ProductsProps) => void,
  id: string,
  setErrorMessage: (message: string) => void
) => {
  const url: string = `${import.meta.env.VITE_API_URL}/${id}`;
  axios
    .get<ProductsProps>(url)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
};
