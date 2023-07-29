import { useOutletContext } from "react-router-dom";
import { OutletContextProps } from "@/interfaces";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";

type HandleQtyProps = (
  e: React.MouseEvent<HTMLButtonElement>,
  qty: number,
  id: number
) => void;

const CartList = () => {
  const { cart, setCart } = useOutletContext<OutletContextProps>();

  const handleQty: HandleQtyProps = (e, qty, id) => {
    if (e.currentTarget.title === "increment") {
      const incrementedCart = cart.map((item) =>
        item.id === id ? { ...item, qty: qty + 1 } : item
      );

      setCart(incrementedCart);
    } else {
      const decrementedCart = cart.map((item) =>
        item.id === id ? { ...item, qty: qty === 1 ? 1 : qty - 1 } : item
      );

      setCart(decrementedCart);
    }
  };

  const deleteCart = (id: number) => {
    const filteredCart = cart.filter((item) => {
      if (cart.length > 1) {
        return item.id !== id;
      } else {
        return localStorage.removeItem("cart");
      }
    });

    setCart(filteredCart);
  };

  const handleChecked = (e: React.MouseEvent<HTMLInputElement>) => {
    const id: number = Number(e.currentTarget.value);

    if (e.currentTarget.checked) {
      const isSelectedItems = cart.map((item) =>
        item.id === id ? { ...item, selected: true } : item
      );

      setCart(isSelectedItems);
    } else {
      const isUnSelectedItems = cart.map((item) =>
        item.id === id ? { ...item, selected: false } : item
      );

      setCart(isUnSelectedItems);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <ul className="lg:w-2/3 w-full mb-20 md:mb-0">
      {cart.map((item) => (
        <li
          key={item.id}
          className="flex gap-5 border-y border-gray-700 py-5 rounded-md relative max-w-2xl items-center">
          <div>
            <input
              id={item.id.toString()}
              type="checkbox"
              value={item.id}
              defaultChecked={item.selected}
              onClick={handleChecked}
              className="checkbox checkbox-secondary border-white w-5 h-5"
            />
          </div>

          <img
            src={item.image}
            loading="lazy"
            alt={item.title}
            className="w-24 h-24 md:w-32 md:h-32 aspect-square object-contain bg-white rounded-md"
          />

          <label htmlFor={item.id.toString()} className="space-y-2">
            <h1 className="text-sm pr-6 md:pr-20 md:text-xl font-bold text-white hover:text-gray-00">
              {item.title}
            </h1>
            <h3 className="md:text-xl">${item.price}</h3>
          </label>

          <div className="flex gap-2 text-white absolute right-0 bottom-5">
            <button
              onClick={(e) => handleQty(e, item.qty, item.id)}
              type="button"
              title="decrement"
              disabled={item.qty === 1}
              className="text-xl bg-black px-2 rounded-md disabled:bg-gray-800">
              -
            </button>

            <p>{item.qty}</p>

            <button
              onClick={(e) => handleQty(e, item.qty, item.id)}
              type="button"
              title="increment"
              className="text-xl bg-black px-2 rounded-md">
              +
            </button>
          </div>

          <FiX
            onClick={() => deleteCart(item.id)}
            className="absolute top-5 right-0 text-white cursor-pointer text-2xl hover:bg-gray-700 rounded-full"
          />
        </li>
      ))}
    </ul>
  );
};

export default CartList;
