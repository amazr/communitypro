import React, { useState } from 'react'
import {UserContext} from '../context/UserContext';

class Home extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    callAPI() {
        fetch("http://localhost:8080/")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    
    componentWillMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className = "container mt-3">
            
            <div className="card shadow text-center bg-light mb-3" >
                <div className="card-header"><i className="fas fa-hands-helping"></i> API Endpoint</div>
                <div className="card-body">
                <h5 className="card-title">{this.state.apiResponse}</h5>
                </div>
            </div>

            <div className="card shadow text-center bg-light mb-3" >
                <div className="card-header"><i className="fas fa-hands-helping"></i> Volunteer Sign-up</div>
                <div className="card-body">
                <h5 className="card-title">You currently don't have a volunteer availability schedule!</h5>
                <p className="card-text">Add a new volunteer availability to be contacted for volunteer opportunitities to help you local community.</p>
                </div>
            </div>
    


            <div className="card shadow text-center mt-3">
                <div className="card-header">
                    <i className="fas fa-calendar-day"></i> Reservations / Rentals
                </div>
                <div className="card-body">
                <h5 className="card-title">Nothing to see here...</h5>
                <p className="card-text">Your reservations will appear here. So empty!</p>
                <a href="/reservations" className="btn btn-info">Make a Reservation <i className="fas fa-arrow-circle-right"></i></a>
                </div>
                <div className="card-footer text-muted">
                Available
                </div>
            </div>


            <div className="card shadow text-center mt-3">
                <div className="card-header">
                    <i className="fas fa-wheelchair"></i> Homecare
                </div>
                <div className="card-body">
                <h5 className="card-title">Nothing to see here...</h5>
                <p className="card-text">Need to request community service or homecare?</p>
                <a href="#" className="btn btn-info">Make a Request <i className="fas fa-arrow-circle-right"></i></a>
                </div>
                <div className="card-footer text-muted">
                Available
                </div>
            </div>


        </div>
        );
    }
}

export default Home;