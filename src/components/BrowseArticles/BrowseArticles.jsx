import { useState, useEffect } from 'react'
import { getArticles } from '../../axios';
import ArticleCard from './ArticleCard';
import 'ldrs/dotSpinner'
import './BrowseArticles.css'

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


    return (
        <main>
            {isLoading ? <div className="spinner">
                <l-dot-spinner
                    size="120"
                    speed="0.9"
                    color="black"
                ></l-dot-spinner>
            </div> :
                <ul id="articles-container">
                    {articleList.map((article, index) => {
                        return (
                            <ArticleCard key={article.article_id} article={article} index={index} />
                        );
                    })}
                </ul>
            }
        </main>
    )
}

export default BrowseArticles;