import { useNavigate } from "react-router-dom";
import Input from "../components/Elements/Input";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useContext } from "react";
import { UserContext } from "@/context/User";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const schema: ZodType<FormData> = z
    .object({
      username: z.string().min(3).max(30),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Password do not match!",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    setUser({
      username: data.username,
      password: data.password,
      isloggedin: false,
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: data.username,
        password: data.password,
        isloggedin: false,
      })
    );

    navigate("/login");
  };

  return (
    <AuthLayout type="register">
      <form
        onSubmit={handleSubmit(submitData)}
        className="w-80 h-auto space-y-5 text-white">
        <Input
          autoFocus
          label="Username"
          id="username"
          maxLength={30}
          placeholder="Enter Username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Enter Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Enter Password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 w-full rounded-md">
          Register
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
