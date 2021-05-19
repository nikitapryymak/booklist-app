import { useState, useContext, useRef } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import db, { timestamp } from "../firebase";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './AddBook.css';

export default function AddBook() {

    const { currentUser } = useContext(AuthContext);
    const titleRef = useRef();
    const authorRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();
    const readingRef = useRef(false);
    const [error, setError] = useState('');
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if (readingRef.current.value !== 'Y' && readingRef.current.value !== 'N') return setError('Please type either "Y" or "N"');
        try {
            await db.collection('users').doc(currentUser.uid).collection('books').add({
                title: titleRef.current.value.trim(),
                author: authorRef.current.value.trim(),
                imageURL: imageRef.current.value.trim(),
                category: categoryRef.current.value.trim(),
                currentlyReading: readingRef.current.value === 'Y' ? true : false,
                timestamp: timestamp()
            });
            history.push('/');
        } catch (err) {
            alert('ERROR!', err.message)
        }
    }

    function goBack() {
        history.push('/');
    }

    return (
        <form onSubmit={handleSubmit} className='AddBook'>
            <h1><ArrowBackIcon color='secondary' onClick={goBack} /> Add Book</h1>
            <label>Title *</label>
            <input ref={titleRef} type="text" required />
            <label>Author *</label>
            <input ref={authorRef} type="text" required />
            <label>Image URL *</label>
            <input ref={imageRef} type="text" required />
            <label>Category</label>
            <input ref={categoryRef} type="text" />
            <label>Currently Reading? (Y/N) {<p>{error}</p>}</label>
            <input ref={readingRef} type="text" maxLength='1' style={{ textTransform: 'uppercase' }} />
            <button type="submit">Add</button>
        </form>
    )
}