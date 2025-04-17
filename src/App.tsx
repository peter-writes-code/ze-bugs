import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes";
import Animate from "./routes/animate";
import Motion from "./routes/motion";
import Performance from "./routes/performance";
import Anatomy from "./routes/anatomy";
import { BugVariantProvider } from './contexts/BugVariantContext';

function App() {
  return (
    <BugVariantProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animate" element={<Animate />} />
          <Route path="/motion" element={<Motion />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/anatomy" element={<Anatomy />} />
        </Routes>
      </Router>
    </BugVariantProvider>
  );
}

export default App;
