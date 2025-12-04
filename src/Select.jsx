import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Select = ({
  options = [],
  value,
  onChange,
  disabled = false,
  searchable = true,
  placeholder = "Select...",
  widthClassName = "w-md",
  className = "",
  multiple = false,
  align = "center",
  maxHeight = "240px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [searchText, setSearchText] = useState("");
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : options;

  const selectedOptions = multiple
    ? options.filter((opt) => Array.isArray(value) && value.includes(opt.value))
    : options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearchText("");
      inputRef.current.focus();
      
      const calculatePosition = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const spaceBelow = window.innerHeight - rect.bottom;
          const maxHeightValue = parseInt(maxHeight) || 240;
          const spaceNeeded = maxHeightValue + 8; // 8px for margin
          
          setOpenUpward(spaceBelow < spaceNeeded && rect.top > spaceNeeded);
        }
      };
      
      calculatePosition();
      
      // Recalculate on scroll and resize
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);
      
      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isOpen, maxHeight]);

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setFocusIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (focusIndex >= 0 && filteredOptions[focusIndex]) {
          handleOptionSelect(filteredOptions[focusIndex].value);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusIndex(-1);
        break;
    }
  };

  const handleOptionSelect = (optionValue) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      const index = newValue.indexOf(optionValue);
      if (index === -1) {
        newValue.push(optionValue);
      } else {
        newValue.splice(index, 1);
      }
      onChange(newValue);
      if (!isOpen) setIsOpen(true);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setFocusIndex(-1);
  };

  const removeOption = (optionValue, e) => {
    e.stopPropagation();
    const newValue = value.filter((v) => v !== optionValue);
    onChange(newValue);
  };

  return (
    <div className="flex" ref={containerRef} onKeyDown={handleKeyDown}>
      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`relative px-4 h-8 border rounded-full flex items-center cursor-pointer ${className} ${widthClassName} ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          }`}
        >
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`w-full outline-none text-${align}`}
              placeholder={placeholder}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={`w-full text-${align} ${
                !selectedOptions ||
                (Array.isArray(selectedOptions) && !selectedOptions.length)
                  ? "text-gray-400"
                  : ""
              }`}
            >
              {multiple
                ? selectedOptions.length
                  ? `${selectedOptions.length} selected`
                  : placeholder
                : selectedOptions
                ? <>
                  {selectedOptions.icon && selectedOptions.iconPosition === "left" && selectedOptions.icon}
                  {selectedOptions.label}
                  {selectedOptions.icon && selectedOptions.iconPosition === "right" && selectedOptions.icon}
                </>
                : placeholder}
            </span>
          )}
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className="absolute right-4"
          />
        </div>

        {multiple && Array.isArray(value) && value.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedOptions.map((option) => (
              <span
                key={option.value}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {option.icon && option.iconPosition === "left" && option.icon}
                {option.label}
                {option.icon && option.iconPosition === "right" && option.icon}
                <button
                  onClick={(e) => removeOption(option.value, e)}
                  className="ml-1 hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </span>
            ))}
          </div>
        )}

        {isOpen && (
          <div
            ref={dropdownRef}
            className={`absolute ${openUpward ? 'bottom-full mb-1' : 'mt-1'} ${widthClassName} bg-white border rounded-lg shadow-lg overflow-auto z-50 text-${align}`}
            style={{ maxHeight }}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No options</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    focusIndex === index ? "bg-gray-100" : ""
                  } ${
                    multiple
                      ? Array.isArray(value) && value.includes(option.value)
                        ? "bg-blue-100"
                        : ""
                      : value === option.value
                      ? "bg-blue-100"
                      : ""
                  }`}
                >
                  {option.icon && option.iconPosition === "left" && option.icon}
                  {option.label}
                  {option.icon && option.iconPosition === "right" && option.icon}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
