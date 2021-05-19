import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SignUp from './components/SignUp';
import AuthProvider from './contexts/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import EditBook from './components/EditBook';
import Nav from "./components/Nav";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./MuiTheme";
import AddBook from "./components/AddBook";
import BookProvider from "./contexts/BookContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <AuthProvider>
            <BookProvider>
              <div className="App">
                <Nav />
                <Switch>

                  <PrivateRoute exact path='/'>
                    <Home /></PrivateRoute>
                    
                  <Route path='/add-book'>
                    <AddBook /></Route>
                  <Route exact path='/edit/:id'>
                    <EditBook /></Route>
                  <Route path='/signup'>
                    <SignUp /></Route>
                  <Route path='/login'>
                    <Login /></Route>
                  <Route path='/forgot-password'>
                    <ForgotPassword /></Route>
                    
                </Switch>
              </div>
            </BookProvider>
          </AuthProvider>
        </Router>
    </ThemeProvider>
  );
}
export default App;