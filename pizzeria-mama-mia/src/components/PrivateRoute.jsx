import React from "react";
import { useUser } from "./UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useUser();

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
