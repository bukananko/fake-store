import { useEffect, useState } from "react";
import { getProducts, getCategories } from "@/utils/getData";
import { ProductsProps } from "@/interfaces";
import { Link } from "react-router-dom";
import Select from "../Elements/Select";
import Footer from "../layouts/Footer";

const CardProducts = () => {
  document.title = "Fake Store";

  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    getProducts((data) => setProducts(data), setErrorMessage);
  }, []);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getCategories((data: ProductsProps[]) => setProducts(data), e.target.value);
  };

  return (
    <>
      <header className="text-center text-white py-10 md:py-20">
        <h1 className="font-extrabold text-3xl md:text-4xl">Fake Store</h1>
        <p className="text-gray-400 text-base mt-2 px-10">
          An e-commerce prototype for learning React.js & TypeScript.
        </p>
      </header>

      {products.length > 0 && !errorMessage ? (
        <>
          <section className="px-5 md:px-40 py-10">
            <div className="text-white flex justify-between border-b border-b-gray-700 py-5 items-center">
              <h1 className="font-bold text-2xl">{products.length} Results</h1>

              <Select onChange={handleCategory} />
            </div>

            <ul className="text-white grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-5 mt-10">
              {products.map((product) => (
                <li key={product.id} title={product.title}>
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      loading="lazy"
                      alt={product.title}
                      className="w-full aspect-square object-contain bg-white rounded-md"
                    />

                    <div className="pt-5">
                      <h1 className="line-clamp-2 font-bold">
                        {product.title}
                      </h1>
                      <p className="font-semibold text-sm text-gray-500 ">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <Footer />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center m-auto text-white">
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

export default CardProducts;
