import { useContext, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import './Auth.css';

export default function SignUp() {

    const { login } = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(emailRef.current.value, passwordRef.current.value) // returns a promise
            history.push('/')
        } catch (err) {
            console.log(err.message);
            setError(true)
        }
    }

    return (
        <div className='SignUp'>

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>Email</label>
                    <input type="text" ref={emailRef} required />
                <label>Password</label>
                    <input type="password" ref={passwordRef} required />

                { error && <p className='error'>Incorrect email and/or password!</p> }
                <button type="submit">Login</button>
                <Link to='/forgot-password'>Forgot Password?</Link>
            </form>
            <p className='below-form'>Don't have an account? <Link to='/signup'>Sign Up.</Link></p>
            
        </div>
    )
}