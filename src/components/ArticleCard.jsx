const ArticleCard = ( {article} ) => {
    return (
        <div className="article-card">
            <img className="article-img" src={article.article_img_url} alt={article.title} />
        <h3>{article.title}</h3>
        </div>
    )
}



export default ArticleCard;