import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCopy } from "@fortawesome/free-solid-svg-icons";

const Pre = ({ hide = false, text, className = "", showHide = true, showCopy = true }) => {
  const [isHidden, setIsHidden] = React.useState(hide);
  const [showCopied, setShowCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className={`relative w-fit ${showHide && showCopy ? "pr-20" : showHide || showCopy ? "pr-10" : ""}`}>
      <pre
        className={`bg-gray-50 px-4 py-2 rounded-lg text-sm whitespace-pre-wrap break-all ${
          isHidden ? "blur-sm" : ""
        } ${className}`}
      >
        {text || " "}
      </pre>
      <div className="flex gap-2 absolute right-1 top-1 z-10">
        <button
          onClick={() => setIsHidden(!isHidden)}
          className={`size-7 text-sm border border-blue-500 text-blue-500 hover:bg-blue-100 rounded-lg ${showHide ? "" : "hidden"}`}
        >
          {isHidden ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
        <div className={`relative ${showCopy ? "" : "hidden"}`}>
          <button
            onClick={copyToClipboard}
            className={`size-7 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg`}
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
          {showCopied && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Copied
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pre;
