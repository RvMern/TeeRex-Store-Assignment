import { useSelector } from 'react-redux';
import { useEffect } from 'react'; // Import useEffect hook
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const { loggedIn } = useSelector(state => state.user);

    useEffect(() => {
        // Check if user is not logged in, then navigate to the login page
        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn, navigate]); // Run this effect whenever `loggedIn` or `navigate` changes

    // Always render the children
    return children;
}

export default PrivateRoute;