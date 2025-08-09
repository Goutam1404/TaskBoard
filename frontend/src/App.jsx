import React from 'react'
import { Route, Router, Routes } from 'react-router'
import { CreatePage, NotesPage, Home } from "./pages/index.js";


const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/detailed-Page" element={<NotesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App