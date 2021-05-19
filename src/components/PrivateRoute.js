import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import './Auth.css'

export default function PrivateRoute({ children, ...rest }) { // rest props are: { path, match, location, history }
  const { currentUser } = useContext(AuthContext);

  return (
    <Route {...rest} // path='/', match, etc.
      
      render={() => {
        return currentUser ? children : <Redirect to="/login" />
      }}
    />
    )
}