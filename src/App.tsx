import Navbar from "./components/layouts/Navbar";
import { Outlet } from "react-router-dom";
import { CartProps } from "./interfaces";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState<CartProps[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-neutral-900 to-slate-800 relative">
      <Navbar cart={cart} />
      <Outlet context={{ cart, setCart }} />
    </div>
  );
}

export default App;
