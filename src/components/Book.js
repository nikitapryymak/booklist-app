import { useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import db from '../firebase';
import './Book.css';

export default function Book({ book }) {

    const { currentUser } = useContext(AuthContext);
    const history = useHistory();

    function handleEdit() {
        history.push(`/edit/${book.id}`);
    }

    async function toggleReading() {
        await db.collection('users').doc(currentUser.uid).collection('books').doc(book.id)
        .update({
            currentlyReading: !book.currentlyReading
        });
    }

    async function handleDelete() {
        await db.collection('users').doc(currentUser.uid).collection('books')
        .doc(book.id).delete();
    }

    return (
        <div className='Book' style={{ backgroundColor: book.currentlyReading === true && '#efefef' }}>
            <div className="bookImage" style={{ backgroundImage: `url(${book.imageURL})`}} />
            <div className="content">
                <h3>{book.title}</h3>
                <h4>by {book.author}</h4>
                { book.category && <h5>category: {book.category}</h5> }
            </div>
            <div className="book-options">
                <h4 onClick={handleEdit}>EDIT</h4>
                <div onClick={toggleReading}><LocalLibraryIcon color='primary' /></div>
                <button onClick={handleDelete} className='finish-btn'>FINISH</button>
            </div>
        </div>
    )
}