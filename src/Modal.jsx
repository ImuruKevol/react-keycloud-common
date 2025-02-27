import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { alertState, useAlert, defaultOpts } from "../store/alertState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/**
 * example 1
import { useAlert } from "store/alertState";

const alert = useAlert();
const res = await alert.success("Hello"); // true / false
const res = await alert.error("Hello"); // true / false
const res = await alert.warning("Hello"); // true / false

 */

/**
 * example 2

// function component 추천 (not arrow component)
const [modal, setModal] = useState(null);
...
setModal({
  title: "패스워드 변경",
  action: "Set Password",
  onClose: ((res) => { // true / false
    if (!res) return setModal(false);
    this.changePassword();
  }),
});

{modal && (
<Modal model={modal}>
  <div>Hello</div>
</Modal>
)}
 */

const Modal = (props) => {
  const { opts, isOpen } = useRecoilValue(alertState);
  const [model, setModel] = useState(null);
  const alert = useAlert();

  const close = (res = false) => {
    if (model && model.onClose) model.onClose(res);
    else alert.close(res);
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        close(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const obj = props.model || opts;
    setModel({ ...defaultOpts, ...obj });
  }, [opts, props.model]);

  const btnColorClass = () => {
    if (model.status === "warning") {
      return "inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto";
    }
    if (model.status === "success") {
      return "inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto";
    }
    return "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto";
  };

  if (!model) return null;
  else {
    if (!props.children && !isOpen) return null;
  }
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-25 transition-opacity"></div>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:max-w-lg sm:min-w-96 sm:p-6"
            style={model.style}
          >
            <div className="sm:flex sm:items-start">
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                  model.status === "warning"
                    ? "bg-yellow-100"
                    : model.status === "success"
                    ? "bg-blue-100"
                    : "bg-red-100"
                }`}
              >
                {model.status === "error" && (
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                )}
                {model.status === "warning" && (
                  <svg
                    className="h-6 w-6 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                )}
                {model.status === "success" && (
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
              </div>
              <div className="mt-2 sm:ml-4 sm:mt-0 sm:text-left flex-1">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {model.title}
                </h3>
                <div className="mt-2">
                  <div
                    className="text-sm text-gray-500"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {props.children || model.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:mt-4 sm:flex sm:flex-row-reverse mt-3">
              {model.action && (
                <button
                  className={btnColorClass()}
                  onClick={() => {
                    close(true);
                  }}
                >
                  {model.action}
                </button>
              )}
              {model.additional && (
                model.additional.map((item) => (
                  <button
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      else close(item.value);
                    }}
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto ${item.className || ""}`}
                  >
                    {item.label}
                  </button>
                ))
              )}
              {model.cancel && <button
                onClick={() => close(false)}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {model.cancel}
              </button>}
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 text-xl">
              <button onClick={() => close(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
