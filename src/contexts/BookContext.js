import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebase";
import { AuthContext } from "./AuthContext";

export const BookContext = createContext();

export default function BookProvider(props) {

    const { currentUser } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [booksLoading, setBooksLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return setBooksLoading(false);
        const unsub = db.collection('users').doc(currentUser.uid).collection('books').orderBy('timestamp', 'desc')
        .onSnapshot(snap => {
            if (snap.empty) { setBooks('empty'); setBooksLoading(false); return; }  
            setBooks(snap.docs.map(book => ({
                id: book.id,
                ...book.data()
            })));
            setBooksLoading(false);
        });
        return unsub;
    }, [currentUser]) // only run once-- when comp renders

    return (
        <BookContext.Provider value={{ books }}>
            {!booksLoading && props.children} 
        </BookContext.Provider>
    )
}