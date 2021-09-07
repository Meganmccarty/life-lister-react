import { useEffect, useState } from 'react';

import RecordForm from './RecordForm';
import RecordList from './RecordList';

function Profile({ user }) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("/records")
            .then(response => response.json())
            .then(data => {
                const recordsForUser = data.filter(record => record.user.id === user.id)
                setRecords(recordsForUser)
            })
    }, []);

    function handleAddRecord(record) {
        setRecords([...records, record])
    }

    function displayUser() {
        if (user) {
            return (
                <div>
                    <h1>Profile</h1>
                    <p>Username: {user.username}</p>
                    <RecordList records={records}/>
                    <RecordForm addRecord={handleAddRecord} />
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