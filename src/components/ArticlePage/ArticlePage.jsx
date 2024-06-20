import { BiLike, BiDislike } from "react-icons/bi";
import 'ldrs/dotSpinner'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getArticles, changeVotes } from '../../axios';
import Comments from '../Comments/Comments'
import './ArticlePage.css'

const ArticlePage = ({ user, currentArticle, setCurrentArticle }) => {

    const { article_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

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

    let upVoteButtonFormat = "vote-button", downVoteButtonFormat = "vote-button";
    if(hasUpVoted) upVoteButtonFormat += " up-vote-button-clicked"
    if(hasDownVoted) upVoteButtonFormat += " down-vote-button-clicked"

    let counterFormat;
    if (hasUpVoted) counterFormat = "counter-up-voted"
    else if (hasDownVoted) counterFormat = "counter-down-voted"

    return (
        <main>
            {isLoading ?
                <div className="spinner">
                    <l-dot-spinner
                        size="120"
                        speed="0.9"
                        color="black"
                    ></l-dot-spinner>
                </div> :
                <section>
                    <h2>{currentArticle.title}</h2>
                    <img id='article-page-img' src={currentArticle.article_img_url} alt="{currentArticle.title}" />

                    <p className={"voting-button-row" + " " + counterFormat}>
                        <span id="counter">{currentArticle.votes}</span>
                        <button
                            onClick={handleUpVoteCommentsClick}
                            className={upVoteButtonFormat}>
                            <BiLike className="vote-icon" />
                        </button>
                        <button
                            onClick={handleDownVoteCommentsClick}
                            className={downVoteButtonFormat}>
                            <BiDislike className="vote-icon" />
                        </button>
                    </p>

                    <p className='article-author'>Author: {currentArticle.author}</p>
                    <p className='article-time-stamp'>{formattedDate}</p>

                    <p>{currentArticle.body}</p>

                    <h3>Comments</h3>
                    <button className="comment-button" onClick={handleOnShowCommentsClick}>{!showComments ? "Show comments" : "Hide Comments"}</button>
                    {showComments ?
                        <Comments user={user} article_id={article_id} /> : null
                    }
                </section>}
        </main>
    )
}

export default ArticlePage;