import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import ShareLifeList from './ShareLifeList';
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

    function handleLogin(user) {
        setUser(user);
    };

    function handleLogout() {
        setUser(null);
    };

    function handlePatchUser(updatedUser) {
        setUser(updatedUser);
    };

    return (
        <>
            <Header user={user} onLogout={handleLogout} />
            <main role="main">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        {user ? <Redirect to="/profile"></Redirect> : <Login onLogin={handleLogin} />}
                    </Route>
                    <Route exact path="/signup">
                        {user ? <Redirect to="/profile"></Redirect> : <Signup onLogin={handleLogin} />}
                    </Route>
                    <Route exact path="/profile">
                        {user ? <Profile user={user} onPatchUser={handlePatchUser} /> : <Redirect to="/login"></Redirect>}
                    </Route>
                    <Route exact path="/lifelist/:username">
                        <ShareLifeList/>
                    </Route>
                </Switch>
            </main>
            <Footer />
        </>
    );
};

export default App;
