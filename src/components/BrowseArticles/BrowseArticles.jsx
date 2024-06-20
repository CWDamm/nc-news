import { useState, useEffect } from 'react'
import { getArticles } from '../../axios';
import { useParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import 'ldrs/dotSpinner'
import './BrowseArticles.css'

const BrowseArticles = ( {articlesLoading, setArticlesLoading} ) => {
    
    const { topic } = useParams();
    const capitalise = (str) => str.slice(0, 1).toUpperCase() + str.slice(1)
    let pageHeader;
    topic ? pageHeader = capitalise(topic): pageHeader = "News"

    const [articleList, setArticleList] = useState([])

    useEffect(() => {
        setArticlesLoading(true)
        getArticles(topic)
            .then((results) => {
                setArticleList(results.articles);
                setArticlesLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [topic])


    return (
        <main>
            {articlesLoading ? <div className="spinner">
                <l-dot-spinner
                    size="120"
                    speed="0.9"
                    color="black"
                ></l-dot-spinner>
            </div> :
                <section>
                    {<h2 id='articles-header'>{pageHeader}</h2>}
                    <ul id="articles-container">
                        {articleList.map((article, index) => {
                            return (
                                <ArticleCard key={article.article_id} article={article} index={index} />
                            );
                        })}
                    </ul>
                </section>
            }
        </main>
    )
}

export default BrowseArticles;