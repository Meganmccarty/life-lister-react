function Profile({ user }) {

    function displayUser() {
        if (user) {
            return (
                <div>
                    <h1>Profile</h1>
                    <p>Username: {user.username}</p>
                </div>
            );
        };
    };

    return (
        <>
            {displayUser()}
        </>
    );
};

export default Profile;