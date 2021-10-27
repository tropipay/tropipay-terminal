
import { Link } from "react-router-dom";
import { useAuth } from '../security/services/auth';

function Menu() {
    const auth = useAuth();
    const username = auth && auth.user ? auth.user.name : 'Gest';
    return (
        <div>
            <h3>Menu:</h3>
            <h4>welcome: {username}</h4>
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