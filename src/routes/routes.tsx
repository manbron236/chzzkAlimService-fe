import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChzzkPage from '../pages/ChzzkPage.tsx';
import Home from '../pages/Home.tsx';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chzzk" element={<ChzzkPage />} />
    </Routes>
  );
};

export default AppRoutes;
