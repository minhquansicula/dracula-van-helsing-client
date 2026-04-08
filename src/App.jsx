import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";
import GlobalPreloader from "./components/GlobalPreloader";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalPreloader />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
