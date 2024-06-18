import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getArticles, getComments } from '../axios';
import CommentCard from './CommentCard'

const ArticlePage = () => {

    const { article_id } = useParams();
    const [currentArticle, setCurrentArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [commentList, setCommentList] = useState([]);
    const [showComments, setshowComments] = useState(false);


    useEffect(() => {
        console.log("article-effect activated")
        getArticles(article_id)
            .then(response => {
                setCurrentArticle(response.article)
                setIsLoading(false)
            })
        getComments(article_id)
            .then(response => {
                setCommentList(response.comments);
            })
    }, [])

    const handleOnShowCommentsClick = () => {
        setshowComments(!showComments)
    }

    const unformattedDate = new Date(currentArticle.created_at);
    const formattedDate = unformattedDate.toLocaleString('en-GB', {});

    if (isLoading) return <p>Loading articles</p>
    return (
        <article id="article-page">
            <h2>{currentArticle.title}</h2>
            <img id='article-page-img' src={currentArticle.article_img_url} alt="{currentArticle.title}" />
            <p className='article-author'>Author: {currentArticle.author}</p>
            <p className='article-time-stamp'>{formattedDate}</p>
            <p>{currentArticle.body}</p>
            <h3>Comments</h3>

            <button id="comment-show-button" onClick={handleOnShowCommentsClick}>{!showComments ? "Show comments" : "Hide Comments"}</button>
            {showComments ?
                <section>
                    <ul id="comment-container">
                        {commentList.map((comment) => {
                            return <CommentCard key={comment.comment_id} comment={comment} />
                        })}
                    </ul>
                </section> : null
            }
        </article>
    )
}

export default ArticlePage;