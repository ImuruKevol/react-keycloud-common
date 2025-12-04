const Switch = ({
  options = [],
  value,
  onChange,
  className = "",
  disabled = false,
}) => {
  const handleClick = (optionValue) => {
    if (disabled) return;
    onChange(optionValue);
  };

  return (
    <div
      className={`flex relative border rounded-full ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          className={`relative z-10 px-4 py-2 text-sm font-medium transition-all focus:outline-none ${
            value === option.value ? (option.labelClassName || "text-white") : "text-gray-700"
          } ${disabled ? "cursor-not-allowed" : ""}`}
          style={{
            width: `${100 / options.length}%`,
          }}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
      <div
        className={`absolute inset-0 rounded-full transition-all
          ${options.find((opt) => opt.value === value)?.colorClassName || "bg-blue-500"}
        `}
        style={{
          left: `${
            ((options.findIndex((opt) => opt.value === value) || 0) / options.length) *
            100
          }%`,
          width: `${100 / options.length}%`,
        }}
      />
    </div>
  );
};

export default Switch;
