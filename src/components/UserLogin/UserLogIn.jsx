import { Link } from 'react-router-dom'
import LoginForm from './LoginForm';

import './UserLogin.css'

const UserLogIn = ({ user, setUser, currentArticle }) => {

    return (
        <main>
            {!user.username ?
                <LoginForm setUser={setUser}/> :
                <section>
                    <h2>Log in successful</h2>
                    <h3>Welcome back {user.name.split(" ")[0]}!</h3>
                    <p className='user-nav-link-container'>
                        <Link className="user-nav-link" to="/">Back to main page</Link>
                    </p>
                    {currentArticle ?
                        <p className='user-nav-link-container'>
                            <Link className="user-nav-link" to={`/articles/${currentArticle.article_id}`}>Back to last viewed article</Link>
                        </p> :
                        null
                    }
                </section>
            }
        </main>
    )
}


export default UserLogIn;