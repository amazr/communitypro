import React, { useState } from 'react'

const Reservations = () => {

    

    return (
        <div className = "container mt-3">
        
        <div className="card shadow text-center mt-3">
            <div className="card-header">
                <i className="fas fa-calendar-day"></i> Reservations / Rentals
            </div>
            <div className="card-body">
                <h5 className="card-title">When do you wish to make the reservation for?</h5>

                <a href="#" className="btn btn-info">Next <i className="fas fa-arrow-circle-right"></i></a>
            </div>


            <div className="card-footer text-muted">
            Available
            </div>
        </div>



    </div>
    );
}

export default Reservations;