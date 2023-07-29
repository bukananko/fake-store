import { FiSearch } from "react-icons/fi";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { CartProps } from "@/interfaces";
import { useRef } from "react";
import NavList from "./NavList";

const Navbar = ({ cart }: { cart: CartProps[] }) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/search/${inputRef.current.value}`);
    inputRef.current.blur();
  };

  return (
    <nav className="py-4 px-5 md:px-10 flex justify-between items-center sticky top-0 bg-gradient-to-r from-neutral-950 to-slate-900 z-50">
      <Link to="/" className="flex gap-2 text-white items-center">
        <img
          src={logo}
          className="rounded-full"
          alt="logo"
          width={40}
          height={40}
          title="Fake Store"
        />
        <h1 className="hidden md:flex font-bold">Fake Store</h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex items-center md:w-2/6 justify-center">
        <input
          ref={inputRef}
          required
          type="search"
          placeholder="Search..."
          className="border border-r-0 border-gray-500 py-2 px-4 rounded-l-md w-1/2 focus:outline-none bg-transparent text-white text-sm shadow-sm shadow-white"
        />

        <button
          type="submit"
          className="bg-gray-700 py-2 px-4 rounded-r-md border border-gray-500 border-l-0 shadow-sm shadow-white">
          <FiSearch color="white" size={20} title="Search" />
        </button>
      </form>

      <NavList cart={cart} />
    </nav>
  );
};

export default Navbar;
