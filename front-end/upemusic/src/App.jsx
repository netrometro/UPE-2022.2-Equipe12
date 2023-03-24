import { AuthProvider } from "./context/auth";
import { Upload } from "./pages/UploadMusic";
import { AppRouter } from "./routes";
import "./styles.css";

export const App = () => {
  
  return (
    <Upload />
    // <AuthProvider>
    //     <AppRouter/>
    // </AuthProvider>
    
  );
}

