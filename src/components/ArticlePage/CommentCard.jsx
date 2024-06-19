
function CommentCard({ comment }) {

    const unformattedDate = new Date(comment.created_at);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    const formattedDate = unformattedDate.toLocaleString('en-GB', options);

    return (
        <li>
            <p className="comment-header"><span className="comment-author">{comment.author}</span> <span className="comment-time-stamp">{formattedDate}</span></p>
            <p className="comment-body">{comment.body}</p>
        </li>
    )
}

export default CommentCard;