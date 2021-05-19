import { useContext } from "react";
import { useHistory, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import db from "../firebase";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect } from "react";
import { useState } from "react";
import './AddBook.css';

export default function EditBook() {

    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [category, setCategory] = useState('');
    const [currentlyReading, setCurrentlyReading] = useState(null);
    console.log(currentlyReading);
    const history = useHistory();

    useEffect(() => {
        async function getBook() {
            const doc = await db.collection('users').doc(currentUser.uid).collection('books').doc(id).get();
            setTitle(doc.data().title);
            setAuthor(doc.data().author);
            setImageURL(doc.data().imageURL);
            setCategory(doc.data().category);
            setCurrentlyReading(doc.data().currentlyReading);
        }
        getBook();
    }, [currentUser.uid, id]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await db.collection('users').doc(currentUser.uid).collection('books').doc(id).update({
                title: title.trim(),
                author: author.trim(),
                imageURL: imageURL.trim(),
                category: category.trim(),
                currentlyReading
            });
            history.push('/');
        } catch (err) {
            alert('ERROR!', err.message)
        }
    }

    function goBack() {
        history.push('/');
    }

    return currentlyReading !== null && (
        <form onSubmit={handleSubmit} className='AddBook'>
            <h1><ArrowBackIcon color='secondary' onClick={goBack} /> Add Book</h1>
            <label>Title *</label>
            <input type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required />
            <label>Author *</label>
            <input type="text" 
                value={author}
                onChange={e => setAuthor(e.target.value)}
                required />
            <label>Image URL *</label>
            <input type="text" 
                value={imageURL}
                onChange={e => setImageURL(e.target.value)} 
                required />
            <label>Category</label>
            <input type="text"
                value={category}
                onChange={e => setCategory(e.target.value)} />
            <label>Currently Reading? (Y/N)</label>
            <input type="text"
                value={currentlyReading ? 'Y' : 'N'}
                onChange={e => setCurrentlyReading(e.target.value)} maxLength='1' style={{ textTransform: 'uppercase' }} />
            <button type="submit">Submit</button>
        </form>
    )
}