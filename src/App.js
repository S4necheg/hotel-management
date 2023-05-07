import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import LeftPanel from './components/LeftPanel';

import Home from './pages/Home';
import Registration from './pages/Registration';
import Guests from './pages/Guests';
import Staff from './pages/Staff';
import Schedule from './pages/Schedule';
import Services from './pages/Services';

function App() {
  return (
    <div className="header clear">
      <Header />
      <div className="content p-50 d-if">
        <LeftPanel />
        
        <Routes>
          <Route path="/" exact element={
          <Home />
          } />

          <Route path="/registration" element={
          <Registration />
          } />

          <Route path="/guests" element={
          <Guests />
          } />

          <Route path="/staff" element={
          <Staff />
          } />

          <Route path="/Work-schedule" element={
          <Schedule />
          } />

          <Route path="/services" element={
          <Services />
          } />
          
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
