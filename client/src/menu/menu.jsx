
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectProfile, selectError } from "../security/services/AuthSlice";

function Menu() {
    const profile = useSelector(selectProfile);
    const error = useSelector(selectError);
    const username = profile && profile.name ? profile.name : 'Gest';
    return (
        <div>
            <h3>Menu:</h3>
            <h4>welcome: {username}</h4>
            <span>-{error} -</span>
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