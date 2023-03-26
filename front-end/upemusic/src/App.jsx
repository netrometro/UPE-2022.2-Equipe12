import { AuthProvider } from "./context/auth";
import { SearchMusic } from "./pages/SearchMusic";
import { Upload } from "./pages/UploadMusic";
import { AppRouter } from "./routes";
import "./styles.css";

export const App = () => {
  
  return (
    // <Upload />
    <SearchMusic />
    // <AuthProvider>
    //     <AppRouter/>
    // </AuthProvider>
    
  );
}

