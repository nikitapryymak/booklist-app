import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import './Auth.css';

export default function ForgotPassword() {
    const emailRef = useRef();
    const [msg, setMsg] = useState(null);
    const { resetPassword } = useContext(AuthContext);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMsg(null)
            setError(null);
            setLoading(true)
            await resetPassword(emailRef.current.value) // returns a promise
            setMsg('Check your email for further instructions.')
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className='SignUp'>

            <form onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                <label>Email</label>
                    <input type="text" ref={emailRef} required />

                { error && <p className='error'>{error}</p> }
                { msg && <p className='success'>{msg}</p> }
                <button type="submit" disabled={loading}>Reset Password</button>
                <Link to='/login'>Cancel</Link>
            </form>
            
        </div>
    )
}