import { BiLike, BiDislike } from "react-icons/bi";
import 'ldrs/dotSpinner'
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getArticlesById, changeVotes } from '../../axios';
import Comments from '../Comments/Comments'
import NoPathPage from '../NoPathPage'

import './ArticlePage.css'

const ArticlePage = ({ user, currentArticle, setCurrentArticle }) => {

    const { article_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [showComments, setshowComments] = useState(false);

    const [hasUpVoted, setHasUpVoted] = useState(false)
    const [hasDownVoted, setHasDownVoted] = useState(false)

    const [serverError, setServerError] = useState(null)
    const [votingError, setVotingError] = useState(false)

    useEffect(() => {
        getArticlesById(article_id)
            .then(response => {
                setCurrentArticle(response.article)
                setIsLoading(false)
            })
            .catch(err => {
                setServerError(err)
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
            setVotingError(false);
            setHasDownVoted(false);
            setHasUpVoted(true);
            shiftVote(2)
                .catch(err => {
                    setVotingError(true);
                    setHasDownVoted(true);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
        else if (hasUpVoted) {
            setVotingError(false);
            setHasUpVoted(false);
            shiftVote(-1)
                .catch(err => {
                    setVotingError(true);
                    setHasUpVoted(true);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
        else {
            setVotingError(false);
            setHasUpVoted(true)
            shiftVote(1)
                .catch(err => {
                    setVotingError(true);
                    setHasUpVoted(false);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }

    }

    const handleDownVoteCommentsClick = () => {
        if (hasUpVoted) {
            setVotingError(false);
            setHasUpVoted(false);
            setHasDownVoted(true);
            shiftVote(-2)
                .catch(err => {
                    setVotingError(true);
                    setHasUpVoted(true);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
        else if (hasDownVoted) {
            setVotingError(false);
            setHasDownVoted(false);
            shiftVote(1)
                .catch(err => {
                    setVotingError(true);
                    setHasDownVoted(true);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
        else {
            setVotingError(false);
            setHasDownVoted(true)
            shiftVote(-1)
                .catch(err => {
                    setVotingError(true);
                    setHasDownVoted(false);
                    setCurrentArticle({ ...currentArticle, votes: currentArticle.votes })
                })
        }
    }

    const unformattedDate = new Date(currentArticle.created_at);
    const formattedDate = unformattedDate.toLocaleString('en-GB', {});

    let upVoteButtonFormat = hasUpVoted ? "vote-button" + " up-vote-button-clicked": "vote-button"
    let downVoteButtonFormat = hasDownVoted ? "vote-button" + " down-vote-button-clicked": "vote-button"

    let counterFormat;
    if (hasUpVoted) counterFormat = "counter-up-voted"
    else if (hasDownVoted) counterFormat = "counter-down-voted"

    if(serverError) {
        return <NoPathPage serverError={serverError}/>
    }
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
                        {votingError ? <span id="vote-change-error">An error has occured, please try again later</span> : null}
                    </p>

                    <p className='article-author'>Author: {currentArticle.author}</p>
                    <p className='article-time-stamp'>{formattedDate}</p>

                    <p>{currentArticle.body}</p>

                    <h3>Comments</h3>
                    <button className="comment-button" onClick={handleOnShowCommentsClick}>
                        {!showComments ? 
                        <span>Show comments <IoMdArrowDropdown /></span> : 
                        <span>Hide comments <IoMdArrowDropup /></span>
                        }
                        </button>
                    {showComments ?
                        <Comments user={user} article_id={article_id} /> : null
                    }
                </section>}
        </main>
    )
}

export default ArticlePage;