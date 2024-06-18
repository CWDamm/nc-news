import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getArticles, getComments, changeVotes } from '../axios';
import CommentCard from './CommentCard'

const ArticlePage = () => {

    const { article_id } = useParams();
    const [currentArticle, setCurrentArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [commentList, setCommentList] = useState([]);
    const [showComments, setshowComments] = useState(false);

    const [hasUpVoted, setHasUpVoted] = useState(false)
    const [hasDownVoted, setHasDownVoted] = useState(false)

    useEffect(() => {
        getArticles(article_id)
            .then(response => {
                setCurrentArticle(response.article)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
            })

        getComments(article_id)
            .then(response => {
                setCommentList(response.comments);
            })
            .catch(err => {
                console.log(err);
            })

        setHasUpVoted(false)

    }, [])

    const handleOnShowCommentsClick = () => {
        setshowComments(!showComments)
    }

    function shiftVote(change) {
        setCurrentArticle({ ...currentArticle, votes: currentArticle.votes + change })
        return changeVotes(article_id, change)
    }

    const handleUpVoteCommentsClick = () => {
        if (hasDownVoted) {
            setHasDownVoted(false);
            shiftVote(1)
                .catch(err => {
                    setHasDownVoted(true);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
        else if (hasUpVoted) {
            setHasUpVoted(false);
            shiftVote(-1)
                .catch(err => {
                    setHasUpVoted(true);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
        else {
            setHasUpVoted(true)
            shiftVote(1)
                .catch(err => {
                    setHasUpVoted(false);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }

    }

    const handleDownVoteCommentsClick = () => {
        if (hasUpVoted) {
            setHasUpVoted(false);
            shiftVote(-1)
                .catch(err => {
                    setHasUpVoted(true);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
        else if (hasDownVoted) {
            setHasDownVoted(false);
            shiftVote(1)
                .catch(err => {
                    setHasDownVoted(true);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
        else {
            setHasDownVoted(true)
            shiftVote(-1)
                .catch(err => {
                    setHasDownVoted(false);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
    }

    const unformattedDate = new Date(currentArticle.created_at);
    const formattedDate = unformattedDate.toLocaleString('en-GB', {});

    let upVoteButtonFormat, downVoteButtonFormat, counterFormat;
    !hasUpVoted ? upVoteButtonFormat = "vote-button" : upVoteButtonFormat = "up-vote-button-clicked";
    !hasDownVoted ? downVoteButtonFormat = "vote-button" : downVoteButtonFormat = "down-vote-button-clicked";

    if (hasUpVoted) counterFormat = "counter-up-voted"
    else if (hasDownVoted) counterFormat = "counter-down-voted"
    else counterFormat = "counter-no-vote"

    if (isLoading) return <p>Loading articles</p>
    return (
        <article id="article-page">
            <h2>{currentArticle.title}</h2>
            <img id='article-page-img' src={currentArticle.article_img_url} alt="{currentArticle.title}" />

            <p>
                <span id={counterFormat}>{currentArticle.votes}</span>
                <button
                    onClick={handleUpVoteCommentsClick}
                    className={upVoteButtonFormat}>
                    <BsArrowUpShort id="up-vote-icon" />
                </button>
                <button
                    onClick={handleDownVoteCommentsClick}
                    className={downVoteButtonFormat}>
                    <BsArrowDownShort id="up-vote-icon" />
                </button>
            </p>

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