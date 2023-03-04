import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth"
import { useContext } from "react";

export const PrivateRoute = () => {
    const {signed} = useContext(AuthContext)
    return signed ? < Outlet /> : <Navigate to="/"/>;
}