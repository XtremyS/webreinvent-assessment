import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import { PrivateRouteProps } from "../utils/types";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
