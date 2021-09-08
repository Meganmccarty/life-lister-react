import { useEffect, useState } from 'react';

import RecordForm from './RecordForm';
import RecordList from './RecordList';

function Profile({ user }) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("/records")
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        const recordsForUser = data.filter(record => record.user.id === user.id)
                        setRecords(recordsForUser)
                    });
                };
            });
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
                    <RecordForm addRecord={handleAddRecord} />
                    <RecordList records={records} onPatchRecord={handlePatchRecord} onDeleteRecord={handleDeleteRecord}/>
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