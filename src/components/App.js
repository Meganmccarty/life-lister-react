import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadingGIF from '../loading.gif'

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import ShareLifeList from './ShareLifeList';
import Footer from './Footer';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/profile")
            .then(response => {
                if (response.ok) {
                    response.json().then(user => {
                        setUser(user);
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
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
                        {loading ? <img id="loading" src={loadingGIF} alt="loading"/> : user ? <Redirect to="/profile"></Redirect> : <Login onLogin={handleLogin} />}
                    </Route>
                    <Route exact path="/signup">
                        {loading ? <img id="loading" src={loadingGIF} alt="loading"/> : user ? <Redirect to="/profile"></Redirect> : <Signup onLogin={handleLogin} />}
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
