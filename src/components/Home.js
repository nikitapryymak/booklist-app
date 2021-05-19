import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Typography } from "@material-ui/core"
import BookIcon from '@material-ui/icons/Book';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from "react-router-dom";
import Book from "./Book";
import { BookContext } from "../contexts/BookContext";
import { useState } from "react";
import './Home.css'

export default function Home() {

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(BookContext);
    const [showForm, setShowForm] = useState(false);
    // const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');

    function removeForm() {
        setCategory('');
        setShowForm(false);
    }

    return (
        <div className='Home'>
            <Typography variant='h1' color='primary'>Hello, {currentUser.name}.</Typography>
            <div className="action-btns">
                <Link to='/add-book'><button>
                    <BookIcon />+ Add New Book</button></Link>
                <button onClick={() => setShowForm(!showForm)}>
                    <SearchIcon />Search</button>
            </div>
            { showForm && 
                <form className='search-form'>
                    {/* <div><label>Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} /></div>
                    <div><label>Author:</label>
                    <input type="text" value={author} onChange={e => setAuthor(e.target.value)} /></div> */}
                    <div><label>Category:</label>
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} /></div>
                    <div onClick={removeForm}><CancelIcon color='primary' /></div>
                </form> }
            
            <Typography variant='h2' color='secondary'>Your Books</Typography>

            <div className="booklist">
                { books.filter(book => {
                    if (category === '' || !showForm) return book;
                    return (book.category).toLowerCase().includes(category.trim().toLowerCase());
                })
                .map(book => <Book book={book} key={book.id} />)
                }
            </div>
        </div>
    )
}