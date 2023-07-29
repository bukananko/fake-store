interface SelectProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: SelectProps) => {
  return (
    <select
      {...props}
      defaultValue="Category"
      className="select select-ghost md:w-full max-w-xs border border-gray-700 capitalize focus:bg-slate-950">
      <option disabled className="disabled:bg-slate-950">
        Category
      </option>
      <option>electronics</option>
      <option>jewelery</option>
      <option>men's clothing</option>
      <option>women's clothing</option>
    </select>
  );
};

export default Select;
