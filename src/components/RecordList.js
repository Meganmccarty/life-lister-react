import RecordCard from './RecordCard';

function RecordList({ records, onPatchRecord, onDeleteRecord }) {

    const displayRecords = records.map(record => {
        return (
            <RecordCard
                key={record.id}
                id={record.id}
                category={record.category}
                dateSeen={record.date_seen}
                notes={record.notes}
                taxon={record.taxon}
                onDeleteRecord={onDeleteRecord}
                onPatchRecord={onPatchRecord}
            />
        );
    });
    
    return (
        <div className="record-list">
            {displayRecords}
        </div>
    );
};

export default RecordList;