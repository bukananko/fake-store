import { UserContext } from "@/context/User";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  type: string;
}

const AuthLayout = ({ children, type }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.isloggedin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen flex-col w-full">
      <header className="mb-10">
        <Link to="/" className="flex items-center justify-center gap-5 w-full">
          <img
            src="/logo.png"
            alt="logo"
            className="rounded-full w-20 h-max md:w-20"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Fake Store
          </h1>
        </Link>
      </header>

      {children}

      <p className="text-center text-lg text-white mt-4">
        {type === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          to={type === "login" ? "/register" : "/login"}
          className="text-blue-500 hover:underline font-extrabold">
          {type === "login" ? "Register" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
