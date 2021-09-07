function RecordCard({ category, dateSeen, notes, taxon }) {
    return (
        <div className="record-card">
            <img src={taxon.image} alt={taxon.common_name}/>
            <div>
                <h3>{taxon.common_name} (<i>{taxon.species}</i>)</h3>
                <h4>Category: {category}</h4>
                <h4>Date first seen: {dateSeen}</h4>
                <h4>Notes: {notes}</h4>
            </div>
        </div>
    );
};

export default RecordCard;