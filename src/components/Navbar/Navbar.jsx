import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTopics } from '../../axios';


function NavBar({ user, setUser }) {

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
            <Link to="/articles" >Home</Link>
            <div className="dropdown">
                <span className='dropdown-btn'>Topics</span>
                <div className='dropdown-content'>
                    {topicsList.map(topic => {
                        return <Link key={topic.slug} to={`/articles/topics/${topic.slug}`}>{capitalise(topic.slug)}</Link>
                    })}
                </div>
            </div>

            {!user.username ?
                <span className='sign-in'>
                    <Link to={"/user/login"}>Sign in</Link>
                </span> :

                <span id="sign-in-indicator">
                    User: {user.username}
                    <button onClick={handleSignOutClick} id="sign-out-button">Sign out</button>
                </span>
            }
        </nav>
    )
}

export default NavBar;

