import React from 'react';
import {UserContext} from '../context/UserContext';
import * as Cookies from "js-cookie";
import { useContext } from 'react';
import Auth from '../context/Auth';
import { Link } from 'react-router-dom';

function Navbar(props) {

    const {user,setUser} = useContext(UserContext)
    

    const logout = event => {
        setUser();
        Cookies.remove("username");
        Auth.logout();

        fetch("http://localhost:8080/logout", {
            method: 'POST',
            credentials: 'include'
            })
            .then(res => console.log(res.text()))
      }
      if (user === undefined) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info justify-content-between">
                <Link to="/" className="navbar-brand" >
                    <i className="fas fa-calendar-day"></i> Best Community Service
                </Link>
                <button type="button" className="btn btn-info btn-sm"><i className="fas fa-sign-out-alt"></i> Login</button>
            </nav>
        );
      }
      else {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info justify-content-between">
                <Link className="navbar-brand" to="/">
                    <i className="fas fa-calendar-day"></i> Best Community Service
                </Link>
                <button type="button" onClick={logout} className="btn btn-info btn-sm"><i className="fas fa-sign-out-alt"></i> Logout</button>
            </nav>
            );
        }
    }
   

export default Navbar;