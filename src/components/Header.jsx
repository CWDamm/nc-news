import { Link } from 'react-router-dom'
import SignInBar from '../components/SignInBar'

const Header = ( {user, setUser }) => {
    return (
        <header>
            <Link to={"/"}>
                <h1>NC News</h1>
            </Link>
            {/* <SignInBar user={user} setUser={setUser}/> */}
        </header>
    )
}

export default Header;