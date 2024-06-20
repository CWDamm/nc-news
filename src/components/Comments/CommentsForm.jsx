const CommentsForm = ( {handleNewCommentSubmit, handleNewCommentChange, newCommentInput, user}) => {
    return (
        <form onSubmit={handleNewCommentSubmit} id='comment-form'>
            <label className="comment-card-author"> {user.username}:
                <input
                    className="comment-form-input"
                    placeholder="Your comment here"
                    onChange={handleNewCommentChange}
                    value={newCommentInput}
                    required
                />
            </label>
            <button className="comment-button">Submit</button>
        </form>
    )
}

export default CommentsForm;