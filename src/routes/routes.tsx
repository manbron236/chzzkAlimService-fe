import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChzzkPage from '../pages/ChzzkPage.tsx';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/chzzk" element={<ChzzkPage />} />
    </Routes>
  );
};

export default AppRoutes;
