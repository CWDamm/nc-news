import { useState, useEffect } from 'react'
import {getArticles} from '../axios';
import ArticleCard from './ArticleCard';

const BrowseArticles = () => {

    const [articleList, setArticleList] = useState([])

    useEffect(() => {
      console.log("app-effect activated")
      getArticles()
      .then((results) => {
        console.log(results)
        setArticleList(results.articles);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [])
  

    return (
        <main id = "articles-container">
            {console.log("here", Array.isArray(articleList))}
            {articleList.map((article) => {
          return (
            <ArticleCard key={article.article_id} article={article}/>
          );
        })}
        </main>
    )
}

export default BrowseArticles;