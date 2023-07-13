import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

export const NavBar = ({ currentUser, setCurrentUser }) => {
    return (
        <nav className="nav">
            <h1><Link to="/">Oscar Anillo</Link></h1>
            {
                Object.keys(currentUser).length ?
                <>
                    <h3>Hello {currentUser}!</h3>
                    <button onClick={() => setCurrentUser("")}>Logout</button>
                </>
            :
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/Register">Register</Link></li>
            </ul>
            }
        </nav>
    )
}

NavBar.propTypes = {
    currentUser: PropTypes.string,
    setCurrentUser: PropTypes.func
}