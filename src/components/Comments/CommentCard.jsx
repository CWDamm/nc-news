import { useState } from 'react'
import { deleteComment } from '../../axios';
import './Comments.css'
import 'ldrs/dotSpinner'
import { IoTrashOutline } from "react-icons/io5";

const spinner = <l-dot-spinner
    className="comment-spinner"
    size="30"
    speed="0.9"
    color="red"
></l-dot-spinner>

function CommentCard({ comment, user }) {

    const [commentDeleted, setCommentDeleted] = useState(false);
    const [failedDelete, setfailedDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const unformattedDate = new Date(comment.created_at);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    const formattedDate = unformattedDate.toLocaleString('en-GB', options);

    function handleDeleteClick() {
        setIsDeleting(true)
        deleteComment(comment.comment_id)
            .then(() => {
                setCommentDeleted(true);
                setIsDeleting(false)
            })
            .catch(err => {
                setIsDeleting(false)
                setCommentDeleted(false)
                setfailedDelete(true)
            })
    }

    return (
        <li>
            {!commentDeleted ?
                (<section>
                    <p className="comment-card-header">
                        <span
                            className="comment-card-author">{comment.author}
                            {user.username === comment.author ?
                                <span>
                                    <button className="delete-button" onClick={handleDeleteClick}>
                                        Delete comment
                                    </button>
                                    <IoTrashOutline />
                                </span> : null}
                        </span>
                        <span className="comment-card-time-stamp">{formattedDate}</span>
                    </p>

                    {failedDelete ?
                        (<p id='delete-comment-error'>
                            Sorry, something went wrong deleting this comment. Please try again later
                        </p>) : null
                    }

                    {isDeleting ?
                        <p>Deleting...{spinner}</p> :
                        <p className="comment-card-body">{comment.body}</p>
                    }

                </section>) : <p id='delete-comment-success'>Comment deleted!</p>
            }
        </li >
    )
}

export default CommentCard;