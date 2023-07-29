interface CustomButtonProps {
  handleAddToCart: () => void;
}

const CustomButton = (props: CustomButtonProps) => {
  const { handleAddToCart } = props;

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-5">
      <button
        className="h-10 px-6 font-semibold rounded-md text-white w-full bg-black"
        onClick={() =>
          alert(
            "of course this button not work lol this is not a real e-commerce web"
          )
        }>
        Buy Now
      </button>

      <button
        onClick={handleAddToCart}
        className="h-10 px-6 font-semibold rounded-md text-white w-full bg-transparent border border-gray-600">
        Add To Cart
      </button>
    </div>
  );
};

export default CustomButton;
