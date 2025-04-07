import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes';
import Anatomy from './routes/anatomy';
import Animate from './routes/animate';
import Performance from './routes/performance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anatomy" element={<Anatomy />} />
        <Route path="/animate" element={<Animate />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
