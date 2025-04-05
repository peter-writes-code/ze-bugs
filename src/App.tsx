import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes';
import Anatomy from './routes/anatomy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anatomy" element={<Anatomy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
