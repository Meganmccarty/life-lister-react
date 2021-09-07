import RecordCard from './RecordCard';

function RecordList({ records }) {

    const displayRecords = records.map(record => {
        return (
            <RecordCard
                key={record.id}
                category={record.category}
                dateSeen={record.date_seen}
                notes={record.notes}
                taxon={record.taxon}
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