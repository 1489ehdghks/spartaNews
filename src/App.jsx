import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import TopLayout from './layout/Toplayout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <TopLayout />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
