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
        <header>
            {user ?
                <div>
                    Welcome, {user.username}!
                    <button onClick={handleLogout}>Logout</button>
                </div>
                :
                <>
                    <button><Link to="/login">Login</Link></button>
                    <button><Link to="/signup">Signup</Link></button>
                </>
            }
        </header>
    );
};

export default Header;