import { Slide, toast } from "react-toastify";

export const toastifyStatuses = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

const toastifyHelper = ({
  status,
  message,
  objData = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  },
}) => {
  return toast[status](message, objData);
};
export default toastifyHelper;
