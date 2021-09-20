import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import loadingGIF from '../loading.gif'

function ShareLifeList() {
    const [publicUser, setPublicUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("--");
    const [sort, setSort] = useState("--");
    const username = useParams().username;

    useEffect(() => {
        fetch(`/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.public_profile === true) {
                    setPublicUser(data)
                }
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])

    function handleCategoryColor(category) {
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
        }
        return color;
    }

    return (
        <>
            {loading ? <img id="loading" src={loadingGIF} alt="loading"/> : 
            publicUser ?
                <>
                    <h1>{publicUser.username}'s Life List</h1>
                    <div className="filter">
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
                    <div className="shared-lifelist">
                        {publicUser.records.filter(record => {
                            return filter !== "--" ? record.category === filter : record;
                        })
                            .sort((a, b) => {
                                if (sort === "Most Recent") {
                                    return b.date_seen.localeCompare(a.date_seen);
                                } else if (sort === "Oldest") {
                                    return a.date_seen.localeCompare(b.date_seen);
                                } else {
                                    return publicUser.records;
                                }
                            }).map(record => {
                                return (<div className="record-card">
                                    <img src={record.taxon.image} alt={record.taxon.common_name} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
                                    <section>
                                        <div className={`${handleCategoryColor(record.category)} record-card-taxon`}>
                                            <span>{record.taxon.common_name}</span>
                                            <span>(<i>{record.taxon.species}</i>)</span>
                                        </div>
                                        <div className="record-card-info">
                                            <span>First seen: {record.date_seen}</span>
                                            {record.notes ? <span>{record.notes}</span> : <br />}
                                        </div>
                                    </section>
                                </div>)
                            })}
                    </div>
                </>
                :
                <>
                    <h1>Oops, you've tried seeing a Life List that is marked as private!</h1>
                    <h2>If you tried accessing your life list, you'll need to <Link to="/login">log in</Link> and visit your profile.</h2>
                    <h2>If you want to share your life list, please ensure you have marked it as public after logging in.</h2>
                </>
            
            }
        </>
    );
};

export default ShareLifeList;