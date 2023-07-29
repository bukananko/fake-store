import { Link, useNavigate, useOutletContext } from "react-router-dom";
import CartList from "../components/Fragments/CartList";
import { OutletContextProps } from "../interfaces";
import CartSummary from "../components/Fragments/CartSummary";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/User";

const CartPage = () => {
  document.title = "Shopping Cart";

  const { cart } = useOutletContext<OutletContextProps>();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user?.isloggedin && navigate("/login");
  }, [user]);

  const totalPrice = cart.reduce((acc, item) => {
    const total = cart.find(
      (product) => product.selected && product.id === item.id
    );

    if (total) {
      return acc + total.price * item.qty;
    } else {
      return acc;
    }
  }, 0);

  return (
    <>
      {cart.length > 0 ? (
        <>
          <header className="text-white text-2xl font-extrabold px-5 md:px-40 pt-10 md:text-4xl">
            Shopping Cart
          </header>

          <section className="px-5 py-10 md:px-40 flex gap-10 md:flex-1 relative">
            <CartList />

            <CartSummary totalPrice={totalPrice} />
          </section>
        </>
      ) : (
        <div className="m-auto text-center text-white leading-10">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>

          <Link to="/" className="text-blue-500 hover:underline">
            Back to shop?
          </Link>
        </div>
      )}
    </>
  );
};

export default CartPage;
