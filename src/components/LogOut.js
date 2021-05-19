import { useContext } from "react"
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"
import './Auth.css';

export default function LogOut() {
    const {logout} = useContext(AuthContext);
    const history = useHistory();

    async function handleLogout() {
        try {
            await logout();
            history.push('/login')
        } catch (err) {
            alert(err.message);
        }
    }
    return <p onClick={handleLogout} className='logout-btn'>Logout</p>
}