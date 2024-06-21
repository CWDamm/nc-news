import { Link } from 'react-router-dom'

function NoPathPage({ serverError }) {

    let errMsg = <h3>Page not found</h3>
    if(serverError) errMsg = <h3>Error {serverError.response.request.status}: {serverError.response.data.msg}</h3>

    return (
        <main>
            {errMsg}
            <p>Please double check the url or follow a different link</p>
            <p className='user-nav-link-container'>
                <Link className="user-nav-link" to="/">Back to main page</Link>
            </p>
        </main>
    )
}

export default NoPathPage;
