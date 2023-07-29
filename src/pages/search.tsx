import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ProductsProps } from "../interfaces";
import { useEffect, useState } from "react";
import Footer from "../components/layouts/Footer";

const SearchPage = () => {
  const { query } = useParams();
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setProducts([]);
    setErrorMessage("");

    const getData = async () => {
      try {
        const url: string = import.meta.env.VITE_API_URL;
        const response = await axios.get<ProductsProps[]>(url);

        if (query) {
          const filtered = response.data.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );

          filtered.length === 0 && setErrorMessage("No Results Found");
          setProducts(filtered);
        }
      } catch (error) {
        error instanceof Error && setErrorMessage(error.message);
      }
    };
    getData();
  }, [query]);

  return (
    <>
      {products.length > 0 && !errorMessage ? (
        <>
          <section className="px-5 md:px-40 py-10">
            <div className="text-white flex justify-between border-b border-b-gray-700 py-5 items-center">
              <h1 className="font-bold text-2xl">{products.length} Results</h1>
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
        <div className="flex flex-col justify-center items-center m-auto">
          {errorMessage ? (
            <>
              <h3 className="text-2xl text-white font-bold">{errorMessage}</h3>

              <Link to="/" className="text-blue-500 hover:underline">
                Back To Shop?
              </Link>
            </>
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

export default SearchPage;
