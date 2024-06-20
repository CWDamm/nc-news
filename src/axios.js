import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-cwdamm.onrender.com/api"
})

export const getArticles = (topic) => {
    return ncNewsApi
        .get(`/articles`, {params: {"topic": topic}})
        .then(response => {
            return response.data
        })
};

export const getTopics = () => {
    return ncNewsApi
        .get(`/topics`)
        .then(response => {
            return response.data
        })
};

export const getArticlesById = (article_id) => {
    return ncNewsApi
        .get(article_id ? `/articles/${article_id}` : `/articles/`)
        .then(response => {
            return response.data
        })
};

export const getUser = (username) => {
    return ncNewsApi
        .get(`/users/${username}`)
        .then(response => {
            return response.data
        })
};

export const getComments = (article_id) => {
    return ncNewsApi
        .get(`/articles/${article_id}/comments`)
        .then(response => {
            return response.data
        })
};

export const changeVotes = (article_id, change) => {
    return ncNewsApi
        .patch(`/articles/${article_id}`, { inc_votes: change })
        .then(response => {
            return response
        })
}

export const postComment = (article_id, body) => {
    return ncNewsApi
        .post(`/articles/${article_id}/comments`, body)
        .then(response => {
            return response.data
        })
}

export const deleteComment = (comment_id) => {
    return ncNewsApi
        .delete(`/comments/${comment_id}`)
}



