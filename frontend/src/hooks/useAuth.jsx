import React from "react";
import { useAuthContext } from "../context/AuthContext.jsx";

const useAuth = () => {
  const value = useAuthContext();
  return value || { user: null, token: null, login: () => {}, logout: () => {}, loading: false };
};

export default useAuth;
