import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Footer from './Footer';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/profile")
            .then(response => {
                if (response.ok) {
                    response.json().then(user => setUser(user));
                }
            })
    }, []);

    console.log(user)

    function handleLogin(user) {
        setUser(user);
    };

    function handleLogout(user) {
        setUser(null);
    };

    return (
        <>
            <Header user={user} onLogout={handleLogout} />
            <Switch>
                <Route exact path="/login">
                    <Login onLogin={handleLogin} />
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/signup">
                    <Signup onLogin={handleLogin} />
                </Route>
            </Switch>
            {user ?
                <Switch>
                    <Route exact path="/profile">
                        <Profile user={user} />
                    </Route>
                </Switch>
                : null}
            <Footer />
        </>
    );
};

export default App;
