import { Navigate, Outlet } from "react-router-dom"

const useAuth=()=>{
    const user=localStorage.getItem('@Auth:user')
    if(user){
      return true
    } else {
      return false
    }
  }

export const PrivateRoute = () => {
    const auth = useAuth();
    return auth ? < Outlet /> : <Navigate to="/"/>;
}