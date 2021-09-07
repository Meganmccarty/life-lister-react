import { useHistory } from 'react-router-dom';

function Profile({ user }) {
    const history = useHistory();

    return (
        <>
            {user ?
                <>
                    <div>This is your profile page</div>
                    <p>Username: {user.username}</p>
                </>
                : history.push("/login")}
        </>
    );
};

export default Profile;