import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-cwdamm.onrender.com/api"
})

export const getArticles = (article_id) => {
    return ncNewsApi
    .get(article_id? `/articles/${article_id}`: `/articles/`)
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