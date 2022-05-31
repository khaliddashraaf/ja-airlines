import React from "react";
import { Navigate } from "react-router-dom";
import Admin from "./admin";

export function AdminRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // console.log("this", isAuthenticated);

  return (
    isAuthenticated === 'true'? <Admin/> : <Navigate to='/Login'/>
  );
}

export default AdminRoute;