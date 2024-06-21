import './App.css'
import { useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header'
import BrowseArticles from './components/BrowseArticles/BrowseArticles'
import ArticlePage from './components/ArticlePage/ArticlePage'
import UserLogIn from './components/UserLogin/UserLogIn';
import NavBar from './components/Navbar/Navbar'
import NoPathPage from './components/NoPathPage'
import { UserProvider } from './contexts/User';


function App() {

  const [currentArticle, setCurrentArticle] = useState("");
  const [articlesLoading, setArticlesLoading] = useState(false);

  return (
    <UserProvider>
    <BrowserRouter>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<BrowseArticles articlesLoading={articlesLoading} setArticlesLoading={setArticlesLoading} />} />
        <Route path="/articles" element={<BrowseArticles articlesLoading={articlesLoading} setArticlesLoading={setArticlesLoading} />} />
        <Route path="/articles/topics/:topic" element={<BrowseArticles articlesLoading={articlesLoading} setArticlesLoading={setArticlesLoading} />} />
        <Route path="/user/login" element={<UserLogIn currentArticle={currentArticle} />} />
        <Route path="/articles/:article_id" element={<ArticlePage currentArticle={currentArticle} setCurrentArticle={setCurrentArticle} />} />
        <Route path="*" element={<NoPathPage />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
  )
}


export default App
