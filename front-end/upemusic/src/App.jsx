import { AuthProvider } from "./context/auth";
import { AppRouter } from "./routes";
import "./styles.css";

export const App = () => {
  

  return (
    <AuthProvider>
        <AppRouter/>
    </AuthProvider>
    
  );
}

