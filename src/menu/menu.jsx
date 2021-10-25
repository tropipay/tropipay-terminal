
import { Link } from "react-router-dom";

function Menu() {
    return (
        <div>
            <h3>Menu:</h3>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/public">Public Page</Link>
                </li>
                <li>
                    <Link to="/private">Protected Page</Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;