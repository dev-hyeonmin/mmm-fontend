import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"

export const NotFound = () => (
    <div className="error">
        <Helmet>
            <title>404 Error | mmm</title>
        </Helmet>
        <img src={require('../images/404-error.png')} />
        <h3>Opps!</h3>
        <p>We can't seem to find the page you are looking for</p>

        <div className="links">
            Here is some helpful link instaed: 
            <Link to="/">home</Link>
        </div>
    </div>
);