import { Link, useHistory } from "react-router-dom";
import CSRFToken from "./cookies";

function Header({ user, onLogout }) {
    const history = useHistory();

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": CSRFToken(document.cookie)
            },
        })
            .then(() => {
                onLogout()
                history.push("/login")
            });
    };

    return (
        <nav role="navigation">
            <div><Link className="logo" to="/">Life-Lister</Link></div>
            <div>
                {user ?
                    <>
                        <span>Welcome, {user.username}!</span>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                    :
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                }
            </div>
        </nav>
    );
};

export default Header;