import { useState, useEffect } from "react";

const InputFile = ({
  label = "Choose File",
  value,
  onChange,
  disabled = false,
  accept = "*",
  // accept = "image/*",
  containerClassName = "",
  className = "",
  valueClassName = "",
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // value가 base64 또는 이미지 URL인 경우 preview 설정
    if (typeof value === "string" && (value.startsWith("data:image/") || value.startsWith("http"))) {
      setPreview(value);
    }
  }, [value]);

  const handleFileChange = (e) => {
    if (disabled) return;
    const file = e.target.files[0];
    if (!file) {
      setPreview(null);
      onChange(null);
      return;
    }
    e.target.value = "";

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onChange(file);
  };

  const clearFile = () => {
    if (disabled) return;
    setPreview(null);
    onChange(null);
  };

  return (
    <div className={`flex items-center gap-2 ${containerClassName}`}>
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="preview"
            className="w-16 h-16 object-contain cursor-pointer hover:opacity-75 transition-opacity"
            onClick={clearFile}
          />
          <div
            className="absolute top-0 right-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={clearFile}
          >
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      )}
      <label className={`cursor-pointer transition-colors px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className} ${disabled ? "cursor-not-allowed" : ""}`}>
        <span className="text-gray-700">{label}</span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          disabled={disabled}
          onChange={handleFileChange}
        />
      </label>
      {value && (
        <>
          <span className={`text-sm text-gray-500 ${valueClassName}`}>{value.name}</span>
          <button className="text-sm text-gray-500" onClick={clearFile} disabled={disabled}>
            <svg
              className="size-5 text-red-500 hover:bg-red-100 rounded-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default InputFile;
