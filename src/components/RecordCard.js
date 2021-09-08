import { useState } from 'react';

function RecordCard({ id, category, dateSeen, notes, taxon, onPatchRecord, onDeleteRecord }) {
    const [editMode, setEditMode] = useState(false);

    const [editCategory, setEditCategory] = useState(category);
    const [editDateSeen, setEditDateSeen] = useState(dateSeen);
    const [editNotes, setEditNotes] = useState(notes);

    function handleEditMode() {
        if (editMode) {
            const configObj = {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category: editCategory,
                    date: editDateSeen,
                    notes: editNotes
                })
            }
            fetch(`/records/${id}`, configObj)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    onPatchRecord(data)
                    setEditMode(false);
                })
                .catch(error => console.log(error))
        } else {
            setEditMode(true)
        }
    }

    function handleDelete() {
        const configObj = {
            method: "DELETE"
        }
        fetch(`/records/${id}`, configObj)
            .then(response => {
                if (response.ok) {
                    onDeleteRecord(id)
                }
            })
    }

    return (
        <div className="record-card">
            <img src={taxon.image} alt={taxon.common_name} />
            <div>
                <h3>{taxon.common_name} (<i>{taxon.species}</i>)</h3>
                {editMode ?
                    <>
                        <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
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
                        <input type="date" value={editDateSeen} onChange={(e) => setEditDateSeen(e.target.value)} />
                        <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} />
                    </>
                    :
                    <>
                        <h4>Category: {category}</h4>
                        <h4>Date first seen: {dateSeen}</h4>
                        <h4>Notes: {notes}</h4>
                    </>
                }
                <button onClick={handleEditMode}>{editMode ? "Save record" : "Edit record"}</button>
                <button onClick={handleDelete}>Delete record</button>
            </div>
        </div>
    );
};

export default RecordCard;