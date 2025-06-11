import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  // Initialize theme globally
  useEffect(() => {
    const savedTheme = localStorage.getItem('foodx_theme') || 'dark';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(savedTheme);
    localStorage.setItem('foodx_theme', savedTheme);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
