import { Link, useHistory } from "react-router-dom";

function Header({ user, onLogout }) {
    const history = useHistory();

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        })
            .then(() => {
                onLogout()
                history.push("/login")
            });
    };

    return (
        <nav role="navigation">
            <div><Link className="logo" to="/">Life-Lister App</Link></div>
            <div>
                {user ?
                    <>
                        Welcome, {user.username}!
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