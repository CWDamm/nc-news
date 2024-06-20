import { useState, useEffect } from 'react'
import { getArticles } from '../../axios';
import { useParams, useSearchParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import 'ldrs/dotSpinner'
import './BrowseArticles.css'

const BrowseArticles = ({ articlesLoading, setArticlesLoading }) => {

    const { topic } = useParams();
    const capitalise = (str) => str.slice(0, 1).toUpperCase() + str.slice(1)
    let pageHeader;
    topic ? pageHeader = capitalise(topic) : pageHeader = "News"

    const [articleList, setArticleList] = useState([])

    const [sortByParam, setSortByParam] = useState("created_at")
    const [sortByOrder, setSortByOrder] = useState("desc")
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setArticlesLoading(true)
        getArticles(topic, sortByParam, sortByOrder)
            .then((results) => {
                setArticleList(results.articles);
                setArticlesLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [topic, sortByParam, sortByOrder])

    const handleSortByChange = (event) => {
        setSortByParam(event.target.value);
        setSearchParams({sort_by: event.target.value, order: searchParams.get('order')})
    }

    const handleOrderByChange = (event) => {
        setSortByOrder(event.target.value);
        setSearchParams({sort_by: searchParams.get('order'), order: event.target.value})
    }

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
                    <label className='drop-down-label'>Sort by
                        <select
                            onChange={handleSortByChange}
                            id='sort-by-dropdown'
                            value={sortByParam}>
                            <option value="created_at">Date</option>
                            <option value="title">{"Headline"}</option>
                            <option value="author">{"Author"}</option>
                            <option value="votes">Votes</option>
                        </select>
                    </label>

                    <span className='drop-down-label'>in</span>

                    <select onChange={handleOrderByChange}
                        id='order-by-dropdown'
                        value={sortByOrder}>
                        <option value="desc">Descending</option>
                        <option selected value="asc">Ascending</option>
                    </select>
                    <label className='drop-down-label' htmlFor='order-by-dropdown'>order
                    </label>
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