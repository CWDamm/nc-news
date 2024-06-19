import { BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom'

const SignInBar = ({ user }) => {
    return (
        <section id="sign-in-bar">
            {!user.username ?
                <Link to={"/user/login"}>
                    <BsPersonCircle />Sign in
                </Link> :
                <p id="sign-in-indicator"> 
                    User: {user.username}
                </p>
            }
        </section>
    )
}

export default SignInBar;