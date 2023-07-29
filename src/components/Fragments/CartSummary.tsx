import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContextProps } from "@/interfaces";

const CartButton = ({ className }: { className?: string }) => {
  const { cart } = useOutletContext<OutletContextProps>();

  const getSelectedItems = cart
    .map((product) => product.selected)
    .filter((item) => item);

  return (
    <button
      onClick={() =>
        alert(
          "of course this button not work lol this is not a real e-commerce web"
        )
      }
      type="button"
      disabled={getSelectedItems.length === 0}
      className={`bg-white font-bold text-black rounded-md px-4 py-2 disabled:bg-gray-400 ${className}`}>
      Checkout ({getSelectedItems.length})
    </button>
  );
};

const CartSummary = ({ totalPrice }: { totalPrice: number }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="bg-black p-5 flex justify-between items-center fixed bottom-0 right-0 left-0">
          <div>
            <h1 className="text-white font-bold text-xl">
              Total : ${totalPrice > 0 ? (totalPrice + 5.0).toFixed(2) : 0}
            </h1>

            <h3 className="text-sm">Shipping estimate : $5.00</h3>
          </div>

          <CartButton />
        </div>
      ) : (
        <div className="bg-black w-80 rounded-md p-4 h-max flex-1 space-y-5 shadow-2xl shadow-white/20 sticky top-40 text-white">
          <h1 className="font-bold text-2xl">Order summary</h1>

          <div className="flex justify-between">
            <h3>Subtotal :</h3>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <hr />

          <div className="flex justify-between">
            <h3>Shipping estimate :</h3>
            <p>$5.00</p>
          </div>
          <hr />

          <div className="flex justify-between">
            <h3>Order total :</h3>
            <p>${totalPrice > 0 ? (totalPrice + 5.0).toFixed(2) : 0}</p>
          </div>

          <CartButton className="w-full" />
        </div>
      )}
    </>
  );
};

export default CartSummary;
