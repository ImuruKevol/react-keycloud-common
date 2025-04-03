const RadioGroup = ({
  options = [],
  onChange,
  value,
  name = Math.random().toString(36).substring(2, 15),
  className = "",
  labelClassName = "",
}) => {
  return (
    <div className={`flex inline-flex gap-2 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center justify-center text-center rounded-lg h-8 px-3 py-1 text-sm font-semibold focus:outline-none sm:flex-1 whitespace-nowrap cursor-pointer
                    ${
                      value === option.value
                        ? "ring-0 bg-blue-500 text-white hover:bg-blue-600"
                        : "ring-1 ring-gray-300 hover:bg-gray-50"
                    }
                    ${labelClassName}
                  `}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange && onChange(option.value);
          }}
        >
          <input
            type="radio"
            className="sr-only"
            checked={value === option.value}
            name={name}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
