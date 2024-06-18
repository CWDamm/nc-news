import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header'
import BrowseArticles from './components/BrowseArticles'
import ArticlePage from './components/ArticlePage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BrowseArticles />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
