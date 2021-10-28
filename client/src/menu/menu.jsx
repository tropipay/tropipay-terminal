
import { Link } from "react-router-dom";
import { useAuth } from '../security/services/auth';

import { useSelector, useDispatch } from 'react-redux';
import { selectProfile, selectError } from "../security/services/AuthSlice";

function Menu() {
    //const auth = useAuth(); useSelector(selectProfile)
    const profile = useSelector(selectProfile);
    const error = useSelector(selectError);
    
    //const username = auth && auth.user ? auth.user.name : 'Gest';
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