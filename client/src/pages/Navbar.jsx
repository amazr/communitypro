import React from 'react';
import { Link } from 'react-router-dom';




function Navbar(props) {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info justify-content-between">
                <a className="navbar-brand" href="#">
                    <i className="fas fa-calendar-day"></i> Best Community Service
                </a>
                <button type="button" className="btn btn-info btn-sm"><i className="fas fa-sign-out-alt"></i> Logout</button>
            </nav>
            );
    }
   

export default Navbar;