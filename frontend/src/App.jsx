import React from 'react'
import { Route, Router, Routes } from 'react-router'
import { CreatePage, NotesPage, Home } from "./pages/index.js";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-page" element={<CreatePage />} />
        <Route path="/detailed-Page" element={<NotesPage />} />
      </Routes>
    </>
  );
}

export default App