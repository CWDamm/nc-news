import { useState, useEffect } from 'react'
import { getArticles } from '../../axios';
import { useParams, useSearchParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import CircularProgress from '@mui/material/CircularProgress';
import './BrowseArticles.css'
import NoPathPage from '../NoPathPage'

const BrowseArticles = ({ articlesLoading, setArticlesLoading }) => {

    const { topic } = useParams();
    const capitalise = (str) => str.slice(0, 1).toUpperCase() + str.slice(1)
    let pageHeader;
    topic ? pageHeader = capitalise(topic) : pageHeader = "News"

    const [articleList, setArticleList] = useState([])

    const [sortByParam, setSortByParam] = useState("created_at")
    const [sortByOrder, setSortByOrder] = useState("desc")
    let [searchParams, setSearchParams] = useSearchParams();

    const [serverError, setServerError] = useState(null)


    useEffect(() => {
        setArticlesLoading(true)
        getArticles(topic, sortByParam, sortByOrder)
            .then((results) => {
                setArticleList(results.articles);
                setArticlesLoading(false)
            })
            .catch((err) => {
                setServerError(err)
            });
    }, [topic, sortByParam, sortByOrder])

    const handleSortByChange = (event) => {
        setSortByParam(event.target.value);
        setSearchParams({ sort_by: event.target.value, order: searchParams.get('order') })
    }

    const handleOrderByChange = (event) => {
        setSortByOrder(event.target.value);
        setSearchParams({ sort_by: searchParams.get('sort_by'), order: event.target.value })
    }

    if (serverError) {
        return <NoPathPage serverError={serverError} />
    }

    return (
        <main>
            {articlesLoading ? <div className="spinner">
                <CircularProgress size="8rem"/>
            </div> :
                <section>
                    {<h2 id='articles-header'>{pageHeader}</h2>}
                    <div id='sorting-drop-down-container'>

                        <div>
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
                        </div>

                        <div>
                            <select onChange={handleOrderByChange}
                                id='order-by-dropdown'
                                value={sortByOrder}>
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                            <label className='drop-down-label' htmlFor='order-by-dropdown'>order
                            </label>
                        </div>
                    </div>
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