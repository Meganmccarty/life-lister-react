import { useState } from 'react';
import CSRFToken from './cookies';

function RecordForm({ addRecord }) {
    const [taxon, setTaxon] = useState("");
    const [category, setCategory] = useState("-Choose Category-");
    const [dateSeen, setDateSeen] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setErrors("");
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": CSRFToken(document.cookie)
            },
            body: JSON.stringify({
                "taxon": taxon,
                "category": category,
                "date": dateSeen,
                "notes": notes,
            }),
        }
        fetch("/api/records", configObj)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        addRecord(data)
                        setTaxon("")
                        setCategory("-Choose Category-")
                        setDateSeen("")
                        setNotes("")
                    })
                } else {
                    response.json().then(error => {
                        setErrors(error.errors.join("; "))
                    })
                }
            }).catch(error => console.log(error))
    }

    return (
        <div className="taxon-form">
            <div className="taxon-form-header">
                <h2>Add a Taxon</h2>
            </div>
            <div className="taxon-form-body">
                <form onSubmit={handleSubmit}>
                    {errors ? <div className="errors">{errors}</div> : null}
                    <div className="taxon-category-date">
                        <label htmlFor="taxon" className="visuallyhidden" />
                        <input
                            required
                            type="text"
                            id="taxon"
                            placeholder="Taxon"
                            value={taxon}
                            onChange={(e) => setTaxon(e.target.value)}
                        />
                        <label htmlFor="category" className="visuallyhidden" />
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>-Choose Category-</option>
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
                        <label htmlFor="date-seen" className="visuallyhidden" />
                        <input
                            type="date"
                            id="date-seen"
                            value={dateSeen}
                            onChange={(e) => setDateSeen(e.target.value)}
                        />
                    </div>
                    <label htmlFor="notes" className="visuallyhidden" />
                    <textarea
                        id="notes"
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <button type="submit">Create Record</button>
                </form>
            </div>
        </div>
    );
};

export default RecordForm;