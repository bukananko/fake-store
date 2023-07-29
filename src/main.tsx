import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/Fragments/ProductDetails.tsx";
import CardProducts from "./components/Fragments/CardProducts.tsx";
import CartPage from "./pages/cart.tsx";
import Error from "./pages/404.tsx";
import SearchPage from "./pages/search.tsx";
import LoginPage from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";
import AboutPage from "./pages/about.tsx";
import UserContextProvider from "./context/User";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <CardProducts />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/search/:query",
        element: <SearchPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
