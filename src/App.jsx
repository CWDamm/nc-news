import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header'
import BrowseArticles from './components/BrowseArticles/BrowseArticles'
import ArticlePage from './components/ArticlePage/ArticlePage'
import SignInBar from './components/SignInBar'
import UserLogIn from './components/UserLogin/UserLogIn';

function App() {

  const [user, setUser] = useState({})
  const [currentArticle, setCurrentArticle] = useState("");

  return (
    <BrowserRouter>
      <SignInBar user={user}/>
      <Header />
      <Routes>
        <Route path="/" element={<BrowseArticles />} />
        <Route path="/user/login" element={<UserLogIn setUser={setUser} user={user} currentArticle={currentArticle}/>} />
        <Route path="/articles/:article_id" element={<ArticlePage user={user} currentArticle={currentArticle} setCurrentArticle={setCurrentArticle}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
