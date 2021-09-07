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

    function handleAddRecord(newRecord) {
        setRecords([...records, newRecord])
    }

    function handlePatchRecord(updatedRecord) {
        const updatedRecordsArray = records.map(record => {
            return record.id === updatedRecord.id ? updatedRecord : record;
        })
        setRecords(updatedRecordsArray)
    }

    function handleDeleteRecord(id) {
        const updatedRecordsArray = records.filter(record => record.id !== id);
        setRecords(updatedRecordsArray);
    }

    function displayUser() {
        if (user) {
            return (
                <div>
                    <h1>Profile</h1>
                    <p>Username: {user.username}</p>
                    <RecordList records={records} onPatchRecord={handlePatchRecord} onDeleteRecord={handleDeleteRecord}/>
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