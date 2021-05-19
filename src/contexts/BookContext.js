import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebase";
import { AuthContext } from "./AuthContext";

export const BookContext = createContext();

export default function BookProvider(props) {

    const { currentUser } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return setUserLoading(false);
        const unsub = db.collection('users').doc(currentUser.uid).collection('books').orderBy('timestamp', 'desc')
        .onSnapshot(snap => {
            if (snap.empty) return setUserLoading(false);
            console.log('Book snapshot ran');
            setBooks(snap.docs.map(book => ({
                id: book.id,
                ...book.data()
            })));
            setUserLoading(false);
        });
        return unsub;
    }, [currentUser]) // only run once-- when comp renders

    return (
        <BookContext.Provider value={{ books }}>
            {!userLoading && props.children} 
        </BookContext.Provider>
    )
}