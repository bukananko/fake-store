import { forwardRef } from "react";

interface InputProps {
  type?: string;
  placeholder: string;
  autoFocus?: boolean;
  label: string;
  id?: string;
  maxLength?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, type = "text", placeholder, id } = props;

  return (
    <>
      <label
        htmlFor={id}
        className="flex flex-col gap-4 text-lg text-white font-bold">
        {label}
      </label>
      <input
        {...props}
        ref={ref}
        placeholder={placeholder}
        type={type}
        className="py-2 px-4 w-full rounded-md bg-transparent border border-gray-500 outline-none focus:outline-pink-500"
      />
    </>
  );
});

export default Input;
