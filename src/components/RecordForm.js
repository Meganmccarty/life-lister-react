import { useState } from 'react';

function RecordForm({ addRecord }) {
    const [taxon, setTaxon] = useState("");
    const [category, setCategory] = useState("-Choose Category-");
    const [dateSeen, setDateSeen] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState("");

    console.log(category);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors("");
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "taxon": taxon,
                "category": category,
                "date": dateSeen,
                "notes": notes,
            }),
        }
        fetch("/records", configObj)
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
                        console.log(error.errors)
                        setErrors(error.errors)
                    })
                }
            }).catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmit}>
            {errors ? <div>{errors}</div>: null}
            <label htmlFor="taxon" className="visuallyhidden" />
            <input
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
            <label htmlFor="date-seen">Date Seen: </label>
            <input
                type="date"
                id="date-seen"
                value={dateSeen}
                onChange={(e) => setDateSeen(e.target.value)}
            />
            <label htmlFor="notes" className="visuallyhidden" />
            <textarea
                id="notes"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <button type="submit">Create Record</button>
        </form>
    );
};

export default RecordForm;