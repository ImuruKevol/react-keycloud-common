import { create } from "zustand";

// Default options
export const defaultOpts = {
  status: "success", // 'success' | 'warning' | 'error'
  title: "Success!",
  message: "This is a success message.",
  action: null,
  cancel: "Cancel",
  style: {},
};

// Alert 상태를 관리하는 Zustand store
const useAlertStore = create((set) => ({
  opts: defaultOpts,
  isOpen: false,
  resolve: null,
}));

// Alert helper 함수;
export const useAlert = () => {
  // 각각의 값을 개별적으로 선택하여 참조 안정성 확보
  const opts = useAlertStore((state) => state.opts);
  const isOpen = useAlertStore((state) => state.isOpen);
  const resolve = useAlertStore((state) => state.resolve);
  
  const alert = { opts, isOpen, resolve };
  
  const setAlert = (updater) => {
    if (typeof updater === "function") {
      useAlertStore.setState((state) => {
        const newState = updater(state);
        return { ...state, ...newState };
      });
    } else {
      useAlertStore.setState((state) => ({ ...state, ...updater }));
    }
  };

  const show = (opts) => {
    setAlert({
      opts: { ...defaultOpts, ...opts },
      isOpen: true,
    });
    return new Promise((resolve) => {
      setAlert({
        resolve: resolve,
      });
    });
  };

  const confirm = (message, opts = {}) => {
    setAlert({
      opts: { ...defaultOpts, message, action: "Confirm", ...opts },
      isOpen: true,
    });
    return new Promise((resolve) => {
      setAlert({
        resolve: resolve,
      });
    });
  }

  const close = (res = false) => {
    const currentResolve = useAlertStore.getState().resolve;
    setAlert({
      opts: defaultOpts,
      isOpen: false,
    });
    if (currentResolve) currentResolve(res);
  };

  const success = async (message, title = "Success!") => {
    setAlert({
      opts: { ...defaultOpts, message, title, status: "success", action: "Close", cancel: false },
      isOpen: true,
    });
    return new Promise((resolve) => {
      setAlert({
        resolve: resolve,
      });
    });
  };

  const error = async (message, title = "Error!") => {
    setAlert({
      opts: { ...defaultOpts, message, title, status: "error", cancel: "Close" },
      isOpen: true,
    });
    return new Promise((resolve) => {
      setAlert({
        resolve: resolve,
      });
    });
  };

  const warning = async (message, title = "Warning!") => {
    setAlert({
      opts: { ...defaultOpts, message, title, status: "warning" },
      isOpen: true,
    });
    return new Promise((resolve) => {
      setAlert({
        resolve: resolve,
      });
    });
  };

  return { show, close, success, error, warning, alert, confirm };
};

// Zustand store를 직접 export하여 Modal에서 사용할 수 있도록 함
export const useAlertStoreValue = () => {
  const opts = useAlertStore((state) => state.opts);
  const isOpen = useAlertStore((state) => state.isOpen);
  return { opts, isOpen };
};

// Store를 직접 export하여 외부에서 사용할 수 있도록 함
export { useAlertStore };

export default useAlert;
