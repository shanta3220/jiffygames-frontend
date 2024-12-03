import "./NotFoundPage.scss"
import image from "../../assets/images/404.png";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <main className="not-found-main">
            <h1>404</h1>
            <p>Oops, This Page Not Found!</p>
            <img src={image} alt="A visual representation for the 404 error." />
            <Link to="/">Go Back</Link>
        </main>
    )
}

export default NotFoundPage
