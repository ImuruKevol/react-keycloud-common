import { atom, useRecoilState } from "recoil";

// Default options
export const defaultOpts = {
  status: "success", // 'success' | 'warning' | 'error'
  title: "Success!",
  message: "This is a success message.",
  action: null,
  cancel: "Cancel",
  style: {},
};

// Alert 상태를 관리하는 atom
export const alertState = atom({
  key: "alertState",
  default: {
    opts: defaultOpts,
    isOpen: false,
    resolve: null,
  },
});

// Alert helper 함수;
export const useAlert = () => {
  const [alert, setAlert] = useRecoilState(alertState);

  const show = (opts) => {
    setAlert((prev) => ({
      ...prev,
      opts: { ...defaultOpts, ...opts },
      isOpen: true,
    }));
    return new Promise((resolve) => {
      setAlert((prev) => ({
        ...prev,
        resolve: resolve,
      }));
    });
  };

  const confirm = (message, opts = {}) => {
    setAlert((prev) => ({
      ...prev,
      opts: { ...defaultOpts, message, action: "Confirm", ...opts },
      isOpen: true,
    }));
    return new Promise((resolve) => {
      setAlert((prev) => ({
        ...prev,
        resolve: resolve,
      }));
    });
  }

  const close = (res = false) => {
    setAlert((prev) => ({
      ...prev,
      opts: defaultOpts,
      isOpen: false,
    }));
    if (alert.resolve) alert.resolve(res);
  };

  const success = async (message, title = "Success!") => {
    setAlert((prev) => ({
      ...prev,
      opts: { ...defaultOpts, message, title, status: "success", action: "Close", cancel: false },
      isOpen: true,
    }));
    return new Promise((resolve) => {
      setAlert((prev) => ({
        ...prev,
        resolve: resolve,
      }));
    });
  };

  const error = async (message, title = "Error!") => {
    setAlert((prev) => ({
      ...prev,
      opts: { ...defaultOpts, message, title, status: "error", cancel: "Close" },
      isOpen: true,
    }));
    return new Promise((resolve) => {
      setAlert((prev) => ({
        ...prev,
        resolve: resolve,
      }));
    });
  };

  const warning = async (message, title = "Warning!") => {
    setAlert((prev) => ({
      ...prev,
      opts: { ...defaultOpts, message, title, status: "warning" },
      isOpen: true,
    }));
    return new Promise((resolve) => {
      setAlert((prev) => ({
        ...prev,
        resolve: resolve,
      }));
    });
  };

  return { show, close, success, error, warning, alert, confirm };
};

export default useAlert;
