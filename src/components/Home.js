import { Link } from 'react-router-dom';

import exampleLifeList from '../images/example-life-list.png';
import taxonForm from '../images/taxon-form.png';
import filter from '../images/filter.png';
import filteredList from '../images/filtered-list.png';
import recordBeforeEdit from '../images/record-before-edit.png';
import recordDuringEdit from '../images/record-during-edit.png';
import recordAfterEdit from '../images/record-after-edit.png';
import makePublic from '../images/make-public.png';
import shareLifeList from '../images/share-life-list.png';
import linkCopied from '../images/link-copied.png';
import exampleSharedLifeList from '../images/example-shared-life-list.png';

function Home() {
    return (
        <>
            <h1>Life-Lister: Track the Organisms You've Seen</h1>
            <img className="home-image" src={exampleLifeList} alt="Example Life List" />
            <h1>Add a Species Using a Simple Form</h1>
            <figure>
                <img className="home-image" src={taxonForm} alt="Taxon Form" />
                <figcaption>Add a taxon using either a common or scientific name!</figcaption>
            </figure>
            <h1>Filter Your Life List by Organism Type and Date Seen</h1>
            <img className="home-image" src={filter} alt="Life List Filter" />
            <img className="home-image" src={filteredList} alt="Filtered List" />
            <h1>Editing Your Life List Records is a Breeze!</h1>
            <div className="image-group">
                <img className="home-image" src={recordBeforeEdit} alt="Record in Need of Edit" />
                <img className="home-image" src={recordDuringEdit} alt="Editing Record" />
                <img className="home-image" src={recordAfterEdit} alt="Edited Record Saved" />
            </div>
            <h1>Share Your Life List with Your Fellow Naturalists!</h1>
            <div className="image-group">
                <img className="home-image" src={makePublic} alt="Make Your Profile Public" />
                <img className="home-image" src={shareLifeList} alt="Clicking the 'Share Life List' Button" />
                <img className="home-image" src={linkCopied} alt="Your Profile Link is Copied to the Clipboard!" />
            </div>
            <img className="home-image" src={exampleSharedLifeList} alt="Example Shared Life List" />
            <h1>Want to Start Your Life List?</h1>
            <button id="home-signup"><Link to="/signup">Create a Free Account!</Link></button>
            <br />
        </>
    );
};

export default Home;