import { Link } from 'react-router-dom'
import { BsArrowUpShort } from "react-icons/bs";

const ArticleCard = ({ article, index }) => {

    return (
        <>
            <li className={index < 2 ? "article-card-big" : "article-card"}>
                <article>
                    <Link to={"/articles/" + article.article_id}>
                        <img className={index < 2 ? "article-img-big" : "article-img"} src={article.article_img_url} alt={article.title} />
                    </Link>
                    <Link to={"/articles/" + article.article_id}>
                        <h3 className='article-card-headlines'>{article.title}</h3>
                    </Link>
                    <p id='article-card-votes'>{article.votes} <BsArrowUpShort /></p>
                </article>
            </li>
        </>
    )
}

export default ArticleCard;