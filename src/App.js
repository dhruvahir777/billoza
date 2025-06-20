import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ColorProvider } from './contexts/ColorContext';
import { DesignSystemProvider } from './design/DesignSystem';
import './App.css';

// Auto-deploy test - Connected to Vercel on June 11, 2025
function App() {
  return (
    <DesignSystemProvider>
      <ThemeProvider>
        <ColorProvider>
          <AuthProvider>
            <Router>
              <div className="App">
                <AppRoutes />
              </div>
            </Router>
          </AuthProvider>
        </ColorProvider>
      </ThemeProvider>
    </DesignSystemProvider>
  );
}

export default App;
