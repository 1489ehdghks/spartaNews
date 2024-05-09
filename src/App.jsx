import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import TopLayout from './layout/Toplayout';
import { AuthProvider } from './process/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <TopLayout />
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
