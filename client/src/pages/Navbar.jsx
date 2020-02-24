import React from 'react';
import { Link } from 'react-router-dom';




function Navbar(props) {

        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-info justify-content-between">
                <a class="navbar-brand" href="#">
                    <i class="fas fa-calendar-day"></i> Best Community Service
                </a>
                <button type="button" class="btn btn-info btn-sm"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </nav>
            );
    }
   

export default Navbar;