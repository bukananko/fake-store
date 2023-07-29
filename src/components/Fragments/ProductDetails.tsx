import { useContext, useEffect, useState } from "react";
import { getDetailProduct } from "@/utils/getData";
import { OutletContextProps, ProductsProps } from "@/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../Elements/Button";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/context/User";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({} as ProductsProps);
  const [errorMessage, setErrorMessage] = useState("");
  const { cart, setCart } = useOutletContext<OutletContextProps>();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDetailProduct((data) => setProduct(data), id as string, setErrorMessage);
  }, [id]);

  const handleAddToCart = () => {
    if (user?.isloggedin) {
      if (cart.find((item) => item.id === product.id)) {
        setCart(
          cart.map((item) => (item.id === product.id ? { ...item } : item))
        );
      } else {
        setCart([
          ...cart,
          {
            id: product.id,
            qty: 1,
            title: product.title,
            price: product.price,
            image: product.image,
          },
        ]);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (product.title) {
    document.title = product.title;
  }

  return (
    <>
      {product.title && !errorMessage ? (
        <section className="text-white px-5 md:px-40 py-10 md:py-20 flex flex-col md:flex-row gap-10 m-auto">
          <img
            src={product.image}
            loading="lazy"
            alt={product.title}
            width={450}
            height={450}
            className=" aspect-square object-contain bg-white rounded-md"
          />

          <div className="flex flex-col gap-3 justify-center">
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
            <p className="font-semibold text-gray-300 text-2xl md:text-3xl">
              ${product.price}
            </p>
            <p className="text-gray-300 flex items-center gap-1">
              Review {product.rating?.rate}/5 ({product.rating?.count})
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              {product.description}
            </p>

            <hr />

            <CustomButton handleAddToCart={handleAddToCart} />
          </div>
        </section>
      ) : (
        <div className="flex flex-col justify-center items-center m-auto">
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <>
              <span className="loading loading-dots loading-lg text-pink-500"></span>
              <p>Loading...</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
