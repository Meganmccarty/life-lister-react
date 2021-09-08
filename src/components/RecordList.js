import { useState } from 'react';

import RecordCard from './RecordCard';

function RecordList({ records, onPatchRecord, onDeleteRecord }) {
    const [filter, setFilter] = useState("--");
    const [sort, setSort] = useState("--");

    const displayRecords = records
        .filter(record => {
            return filter !== "--" ? record.category === filter : record;
        })
        .sort((a, b) => {
            if (sort === "Most Recent") {
                return b.date_seen.localeCompare(a.date_seen);
            } else if (sort === "Oldest") {
                return a.date_seen.localeCompare(b.date_seen);
            } else {
                return records;
            }
        })
        .map(record => {
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
        <>
            <div>
                <label htmlFor="filter-category">Filter by Category: </label>
                <select id="filter-category" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>--</option>
                    <option>Bird</option>
                    <option>Butterfly</option>
                    <option>Fish</option>
                    <option>Insect</option>
                    <option>Mammal</option>
                    <option>Plant</option>
                    <option>Reptile</option>
                    <option>Other</option>
                </select>
                <label htmlFor="sort-date">Sort by Date Seen: </label>
                <select id="sort-date" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option>--</option>
                    <option>Most Recent</option>
                    <option>Oldest</option>
                </select>
            </div>
            <div className="record-list">
                {displayRecords}
            </div>
        </>
    );
};

export default RecordList;