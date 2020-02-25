import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import ReactDOM from 'react-dom';
import {useContext} from 'react';
import Home from '../pages/Home';
import Footer from '../pages/Footer';
import Navbar from '../pages/Navbar';
import Login from '../pages/Login';
import Reservations from '../pages/Reservations';
import {UserContext,UserContextProvider} from '../context/UserContext';
import Auth from '../context/Auth';
import Cookies from "js-cookie";


const Main = () => {

    let sessionCookie = Cookies.get("username");
    
    
    const ProtectedRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            sessionCookie != null
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
                <Route path="/login" component={Login}/>
            </UserContextProvider>
            
            
            
            <Footer />
        </div>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));

export default Main;