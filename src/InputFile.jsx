import { useState } from "react";

const InputFile = ({
  label = "Choose File",
  value,
  onChange,
  accept = "image/*",
  className = "",
}) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
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
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="flex items-center gap-2">
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
      <label className={`cursor-pointer transition-colors ${className}`}>
        <span className="text-gray-700">{label}</span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </label>
      {value && (
        <>
          <span className="text-sm text-gray-500">{value.name}</span>
          <button className="text-sm text-gray-500" onClick={clearFile}>
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
