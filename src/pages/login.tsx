import { useNavigate } from "react-router-dom";
import Input from "../components/Elements/Input";
import { useContext, useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { UserContext } from "@/context/User";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    if (
      target.username.value === user.username &&
      target.password.value === user.password
    ) {
      navigate("/");
      setUser({ ...user, isloggedin: true });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, isloggedin: true })
      );
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <AuthLayout type="login">
      <form onSubmit={handleLogin} className="w-80 h-auto space-y-5 text-white">
        <Input
          autoFocus
          id="username"
          maxLength={30}
          placeholder="Enter Username"
          label="Username"
        />

        <Input
          id="password"
          type="password"
          placeholder="Enter Password"
          label="Password"
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 w-full rounded-md">
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
