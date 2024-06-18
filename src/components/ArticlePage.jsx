import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getArticles } from '../axios';

const ArticlePage = () => {

    const { article_id } = useParams();
    const [currentArticle, setCurrentArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("article-effect activated")
        getArticles(article_id)
            .then(response => {
                setCurrentArticle(response.article)
                setIsLoading(false)
            })
    }, [])

    const unformattedDate = new Date(currentArticle.created_at);
    const formattedDate = unformattedDate.toLocaleString('en-GB', {});

    if (isLoading) return <p>Loading articles</p>
    return (
        <article id="article-page">
            <h2>{currentArticle.title}</h2>
                <img id='article-page-img' src={currentArticle.article_img_url} alt="{currentArticle.title}"/>
            <p>Author: {currentArticle.author}</p>
            <p>{formattedDate}</p>
            <p>{currentArticle.body}</p>
        </article>
    )
}

export default ArticlePage;