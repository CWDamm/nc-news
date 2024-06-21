import { Link } from 'react-router-dom'
import { BsArrowUpShort } from "react-icons/bs";
import { BsChatSquareText } from "react-icons/bs";

const ArticleCard = ({ article, index }) => {

    return (
        <>
            <li className={index < 2 ? "article-card-big" : "article-card"}>
                <article>
                    <div className='article-img-container'>
                        <Link to={"/articles/" + article.article_id}>
                            <img className={index < 2 ? "article-img-big" : "article-img"} src={article.article_img_url} alt={article.title} />
                        </Link>
                    </div>
                    <p id='article-card-counters'>
                        <span className='counter-span'>{article.votes} <BsArrowUpShort id='BsArrowUpShort'/></span>
                        <span className='counter-span'>{article.comment_count}<BsChatSquareText id='BsChatSquareText'/></span>
                    </p>
                    <Link to={"/articles/" + article.article_id}>
                        <h3 className='article-card-headlines'>{article.title}</h3>
                    </Link>
                </article>
            </li>
        </>
    )
}

export default ArticleCard;