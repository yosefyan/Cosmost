import { Navigate } from "react-router-dom";
import useInitLogin from "../hooks/useInitLogin";
import toastifyHelper, { toastifyStatuses } from "../helpers/toastifyHelper";
import { useSelector } from "react-redux";
import { routesPaths } from "../constants/routesData";

const DynamicAdminMiddleware = ({ children }) => {
  const { finishedLoading } = useInitLogin();
  const { isAdmin } = useSelector((state) => state.authReducer);

  if (finishedLoading) {
    toastifyHelper({
      status: toastifyStatuses.error,
      message: "Invalid Route or insufficient Privileges",
    });
    return (
      <Navigate to={!isAdmin ? routesPaths.Home : routesPaths.Admin}>
        {children}
      </Navigate>
    );
  }
 
  return null;
};

export default DynamicAdminMiddleware;
