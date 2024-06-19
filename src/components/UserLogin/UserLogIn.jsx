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
                    <p>Welcome back {user.name.split(" ")[0]}!</p>
                    <p>
                        <Link to="/">Back to main page</Link>
                    </p>
                    {currentArticle ?
                        <p>
                            <Link to={`/articles/${currentArticle.article_id}`}>Back to last viewed article</Link>
                        </p> :
                        <></>
                    }
                </section>
            }
        </main>
    )
}


export default UserLogIn;