import { useState, useEffect } from 'react'
import { getArticles } from '../axios';
import ArticleCard from './ArticleCard';

const BrowseArticles = () => {

    const [articleList, setArticleList] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getArticles()
            .then((results) => {
                setArticleList(results.articles);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    if(isLoading) return <p>Loading articles</p>
    return (
        <ul id="articles-container">
            {articleList.map((article, index) => {
                return (
                    <ArticleCard key={article.article_id} article={article} index={index}/>
                );
            })}
        </ul>
    )
}

export default BrowseArticles;