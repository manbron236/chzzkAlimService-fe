import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import AppRoutes from './routes/routes.tsx';
import "./styles/global.css"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
