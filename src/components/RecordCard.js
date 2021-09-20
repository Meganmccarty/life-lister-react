import { useState } from 'react';
import CSRFToken from './cookies';

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
                    "Content-Type": "application/json",
                    "X-CSRF-Token": CSRFToken(document.cookie)
                },
                body: JSON.stringify({
                    category: editCategory,
                    date: editDateSeen,
                    notes: editNotes
                })
            }
            fetch(`/api/records/${id}`, configObj)
                .then(response => response.json())
                .then(data => {
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
            method: "DELETE",
            headers: {
                "X-CSRF-Token": CSRFToken(document.cookie)
            }
        }
        fetch(`/api/records/${id}`, configObj)
            .then(response => {
                if (response.ok) {
                    onDeleteRecord(id)
                }
            })
    }

    function handleCategoryColor() {
        let color;
        switch (category) {
            case "Amphibian":
                color = "pink-category";
                break;
            case "Bird":
                color = "blue-category"
                break;
            case "Butterfly":
                color = "purple-category";
                break;
            case "Fish":
                color = "yellow-category";
                break;
            case "Insect":
                color = "orange-category";
                break;
            case "Mammal":
                color = "gray-category";
                break;
            case "Plant":
                color = "green-category";
                break;
            case "Reptile":
                color = "indigo-category";
                break;
            case "Other":
                color = "red-category";
                break;
            default:
                color = "";
                break;
        }
        return color;
    }

    return (
        <div className="record-card">
            <img src={taxon.image} alt={taxon.common_name} />
            <section>
                <div className={`${handleCategoryColor()} record-card-taxon`}>
                    <span>{taxon.common_name}</span>
                    <span>(<i>{taxon.species}</i>)</span>
                </div>
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
                    <div className="record-card-info">
                        <span>First seen: {dateSeen}</span>
                        {notes ? <span>{notes}</span> : <br />}
                    </div>
                }
                <div className="button-container">
                    <button className="save-edit-button" onClick={handleEditMode}>{editMode ? "Save" : "Edit"}</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </div>
            </section>
        </div>
    );
};

export default RecordCard;