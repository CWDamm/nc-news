import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { getTopics } from '../../axios';
import { UserContext } from '../../contexts/User';

function NavBar( ) {

    const { user, setUser } = useContext(UserContext);

    const [topicsList, setTopicsList] = useState([])

    useEffect(() => {
        getTopics()
            .then((result) => {
                setTopicsList(result.topics)
            })
    }, [])

    const capitalise = (str) => str.slice(0, 1).toUpperCase() + str.slice(1)

    const handleSignOutClick = () => {
        setUser({})
    }

    return (
        <nav id="navbar">
            <div id='nav-bar-inner'>
                <div id='nav-bar-inner-left'>
                    <ul className='nav-bar-topic-list'>
                        <Link id="nav-bar-home-link" to="/articles">Home</Link>
                        {topicsList.map(topic => {
                            return (
                                <li key={topic.slug} className="nav-bar-topics">
                                    <Link className="nav-bar-links" to={`/articles/topics/${topic.slug}`}>{capitalise(topic.slug)}</Link>
                                </li>)
                        })}
                    </ul>
                </div>

                {!user.username ?
                    <span className='sign-in'>
                        <Link className='sign-in-link' to={"/user/login"}>Sign in</Link>
                    </span> :

                    <div id="sign-in-container">
                        <span id='nav-bar-username'>User: {user.username}</span>
                        <button onClick={handleSignOutClick} id="sign-out-button">Sign out</button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default NavBar;

