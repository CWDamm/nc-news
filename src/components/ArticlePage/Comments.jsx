import { useState, useEffect } from 'react'
import CommentCard from './CommentCard'
import { Link } from 'react-router-dom'
import { getComments, postComment } from '../../axios';

function Comments({ user, article_id }) {

    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [isProcessingComment, setIsProcessingComment] = useState(false);
    const [processingError, setProcessingError] = useState(false)

    const [commentList, setCommentList] = useState([]);
    const [newComment, setNewComment] = useState("")
    const [newCommentCount, setNewCommentCount] = useState(0)

    useEffect(() => {
        getComments(article_id)
            .then(response => {
                setCommentList(response.comments);
                setIsLoadingComments(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value)
    }

    const handleNewCommentSubmit = (event) => {
        event.preventDefault();

        setIsProcessingComment(true);
        setNewComment("");
        setNewCommentCount(newCommentCount + 1);

        const body = {
            username: user.username,
            body: newComment
        }
        const newCommentObject = {
            body: newComment,
            author: user.username,
            created_at: Date.now(),
            comment_id: 1000000000 + newCommentCount
        }

        postComment(article_id, body)
            .then((response) => {
                setCommentList([newCommentObject, ...commentList])
                setIsProcessingComment(false)
                setProcessingError(false)
            })
            .catch(err => {
                setCommentList(commentList.slice(0, -1))
                setIsProcessingComment(false)
                setProcessingError(true)
                setNewCommentCount(newCommentCount - 1)
            })
    }

    if (isLoadingComments) return <p>Loading Comments</p>
    return <section>
        {user.username ?
            (!isProcessingComment ?
                <section>
                    {processingError? <p id="new-comment-error">We're sorry, something went wrong uploading your comment. Please try again:</p> : <p>Make comment:</p>}
                    <form onSubmit={handleNewCommentSubmit}>
                        <label className="comment-author">{user.username}:
                            <input
                                className="comment-form-input"
                                type="text"
                                placeholder="Your comment here"
                                onChange={handleNewCommentChange}
                                value={newComment}
                                required
                            />
                        </label>
                        <button className="comment-button">Submit</button>
                    </form>
                </section> :
                <p>Processing comment</p>) :
            <p><Link to="../user/login">Log-in</Link> to make a comment</p>
        }

        <ul id="comment-container">
            {commentList.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} />
            })}
        </ul>
    </section>

}

export default Comments;