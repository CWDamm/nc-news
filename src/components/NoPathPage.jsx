import { useNavigate } from 'react-router-dom';

function NoPathPage({ serverError }) {

    const navigate = useNavigate();
    
    let errMsg = <h3>Page not found</h3>
    if(serverError) errMsg = <p>Error {serverError.response.request.status}: {serverError.response.data.msg}</p>

    return (
        <main>
            <h3>Whoops! Something went wrong. Please double check the url or follow a different link</h3>
            {errMsg}
            <p className='user-nav-link-container'>
                <button className="user-nav-link" onClick={() => navigate(-1)}>Back to previous page</button>
            </p>
        </main>
    )
}

export default NoPathPage;
