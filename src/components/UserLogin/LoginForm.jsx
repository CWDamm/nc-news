import { useState } from 'react'
import { getUser } from '../../axios';
import CircularProgress from '@mui/material/CircularProgress';

function LoginForm({ setUser }) {

    const [formUserName, setFormUserName] = useState("");
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        getUser(formUserName)
            .then(({ user }) => {
                setUser(user)
                setFormUserName("")
                setShowError(false);
                setIsLoading(false)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setShowError(true);
                    setIsLoading(false);
                }
            })
    }

    const handleChange = (event) => {
        setFormUserName(event.target.value)
    }

    if (isLoading) return (
        <div>
            <p>Searching for username</p>
            <div className="spinner">
                <CircularProgress size="8rem" />
            </div>
        </div>
    )
    return (
        <section>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:
                    <input
                        id='user-name-input'
                        onChange={handleChange}
                        value={formUserName}
                        required>
                    </input>
                </label>
                {showError ? <p id="sign-in-error">Username not recognised. Please try again.</p> : null}
                <p id='user-name-hint'> No username? Try our test account using 'tickle122'</p>
                <p>
                    <button id="username-submit-button">Submit</button>
                </p>
            </form>
        </section>
    )
}

export default LoginForm;