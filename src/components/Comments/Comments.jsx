import { useState, useEffect } from 'react'
import CommentCard from './CommentCard'
import CommentsForm from './CommentsForm'
import { Link } from 'react-router-dom'
import { getComments, postComment } from '../../axios';
import 'ldrs/dotSpinner'

const spinner = <l-dot-spinner
    className="comment-spinner"
    size="30"
    speed="0.9"
    color="red"
></l-dot-spinner>

function Comments({ user, article_id }) {

    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [isProcessingComment, setIsProcessingComment] = useState(false);
    const [processingError, setProcessingError] = useState(false)

    const [commentList, setCommentList] = useState([]);
    const [newCommentInput, setNewCommentInput] = useState("")

    useEffect(() => {
        getComments(article_id)
            .then(response => {
                setCommentList(response.comments);
                setIsLoadingComments(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [article_id])


    const handleNewCommentChange = (event) => {
        setNewCommentInput(event.target.value)
    }

    const handleNewCommentSubmit = (event) => {
        event.preventDefault();

        setIsProcessingComment(true);

        const body = {
            username: user.username,
            body: newCommentInput
        }

        setNewCommentInput("");

        postComment(article_id, body)
            .then((response) => {
                console.log(response);
                setCommentList([response.newComment, ...commentList])
                setIsProcessingComment(false)
                setProcessingError(false)
            })
            .catch(err => {
                setIsProcessingComment(false)
                setProcessingError(true)
            })
    }

    const CommentsList = () => {
        return <ul id="comment-cards-container">
            {commentList.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} user={user} setCommentList={setCommentList} />
            })}
        </ul>
    }

    let commentMsg;
    if (isLoadingComments) commentMsg = <p className='comment-msg'>Loading Comments</p>
    else if (!user.username) commentMsg = <p className='comment-msg'><Link to="../user/login">Log-in</Link> to make a comment</p>
    else if (isProcessingComment) commentMsg = <p className='comment-msg'>Processing comment{spinner}</p>
    else if (processingError) commentMsg = <p className='comment-msg' id="new-comment-error">We're sorry, something went wrong uploading your comment. Please try again.</p>
    else commentMsg = <p className='comment-msg'>Make comment:</p>

    return (
        <section id='comments-container'>
            {commentMsg}
            {!isLoadingComments && !isProcessingComment && user.username ?
                <CommentsForm handleNewCommentSubmit={handleNewCommentSubmit} handleNewCommentChange={handleNewCommentChange} newCommentInput={newCommentInput} user={user} /> : null}
            <CommentsList />
        </section>
    )
}

export default Comments;