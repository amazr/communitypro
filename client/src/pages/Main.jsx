import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import ReactDOM from 'react-dom';
import Home from '../pages/Home';
import Footer from '../pages/Footer';
import Navbar from '../pages/Navbar';
import Login from '../pages/Login';
import Reservations from '../pages/Reservations';
import Rentals from '../pages/Rentals';
import {UserContextProvider} from '../context/UserContext';
import Cookies from "js-cookie";
import Auth from "../context/Auth";


const Main = () => {

    let sessionCookie = Cookies.get("username");
    
    console.log(sessionCookie+" COOKI");
    const ProtectedRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            sessionCookie !== undefined || Auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
        )
    
  return (
    <Router>
        <div>
            <UserContextProvider>
                <Navbar />
                <ProtectedRoute exact path="/" component={Home}/>
                <ProtectedRoute path="/reservations" component={Reservations}/>
                <ProtectedRoute path="/rental" component={Rentals}/>
                <Route path="/login" component={Login}/>
                <Footer />
            </UserContextProvider>
        </div>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));

export default Main;