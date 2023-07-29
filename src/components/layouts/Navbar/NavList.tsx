import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartProps } from "@/interfaces";
import { UserContext } from "@/context/User";
import {
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";

const NavList = ({ cart }: { cart: CartProps[] }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

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

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAuth = () => {
    if (user?.isloggedin) {
      setUser({ ...user, isloggedin: false });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, isloggedin: false })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="flex gap-4 items-center text-white">
          <button className="indicator" onClick={handleMenu}>
            {cart.length > 0 && user?.isloggedin && !isOpen && (
              <span className="indicator-item badge badge-secondary text-xs px-1">
                {cart.length}
              </span>
            )}
            {isOpen ? (
              <FiX color="white" size={24} title="Menu" />
            ) : (
              <FiMenu color="white" size={24} title="Menu" />
            )}
          </button>

          <ul
            onClick={handleMenu}
            className={`${
              isOpen ? "block" : "hidden"
            } absolute bg-black py-5 w-44 px-4 top-16 right-5 rounded-md text-white space-y-4`}>
            <li className="hover:bg-white/20 rounded-md">
              <Link to="/cart" className="flex items-center gap-4">
                <FiShoppingCart color="white" size={20} title="Cart" />
                Cart
                {cart.length > 0 && user?.isloggedin && (
                  <span className="indicator-item badge badge-secondary text-xs px-1">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="hover:bg-white/20 rounded-md">
              <Link to="/about" className="indicator flex items-center gap-4">
                <FiInfo color="white" size={20} title="About" />
                About
              </Link>
            </li>
            <li onClick={handleAuth} className="hover:bg-white/20 rounded-md">
              <button className="flex items-center gap-4">
                {user?.isloggedin ? (
                  <>
                    <FiLogOut color="white" size={20} title="Logout" />
                    Logout
                  </>
                ) : (
                  <>
                    <FiLogIn color="white" size={20} title="Login" />
                    Login
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <ul className="flex items-center gap-4 text-white">
            <li>
              <Link to="/cart" className="hover:text-gray-300 indicator">
                Cart
                {cart.length > 0 && user?.isloggedin && (
                  <span className="indicator-item badge badge-secondary text-xs px-1">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <button
                onClick={handleAuth}
                className="hover:text-gray-300 border border-gray-400 py-1 px-4 rounded-md">
                {user?.isloggedin ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default NavList;
