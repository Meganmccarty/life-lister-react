import { useState } from 'react';

import RecordCard from './RecordCard';
import CSRFToken from './cookies';

function RecordList({ user, onPatchUser, records, onPatchRecord, onDeleteRecord }) {
    const [filter, setFilter] = useState("--");
    const [sort, setSort] = useState("--");
    const [copied, setCopied] = useState(null);

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
    
    function handleProfile() {
        const configObj = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRF-Token": CSRFToken(document.cookie)
            },
            body: JSON.stringify({
                public_profile: !user.public_profile
            })
        }
        fetch(`/api/users/${user.id}`, configObj)
            .then(response => response.json())
            .then(data => {
                console.log("Updated User: ", data)
                onPatchUser(data)
            })
            .catch(error => console.log(error))
    }

    function handleCopyLifeListURL(e) {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = e.target.value;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setCopied("Link Copied!")
    }

    return (
        <>
            <div className="filter-and-profile">
                <div className="filter">
                    <label htmlFor="filter-category">Filter by Category: </label>
                    <select id="filter-category" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option>--</option>
                        <option>Amphibian</option>
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
                <div className="share-profile">
                    {user.public_profile === false ?
                        <button onClick={handleProfile}>Make my profile public!</button>
                        :
                        <>
                            <button value={`https://life-lister.herokuapp.com/lifelist/${user.username}`} onClick={handleCopyLifeListURL}>{copied ? <span id="copied-text">{copied}</span> : <>Share my life list!</>}</button>
                            <button onClick={handleProfile}>Make my profile private</button>
                        </>
                    }
                </div>
            </div>
            <div className="record-list">
                {displayRecords}
            </div>
        </>
    );
};

export default RecordList;