import React, { useState } from 'react'

const Reservations = () => {

    

    return (
        <div class = "container mt-3">
        
        <div class="card shadow text-center mt-3">
            <div class="card-header">
                <i class="fas fa-calendar-day"></i> Reservations / Rentals
            </div>
            <div class="card-body">
                <h5 class="card-title">When do you wish to make the reservation for?</h5>

                <a href="#" class="btn btn-info">Next <i class="fas fa-arrow-circle-right"></i></a>
            </div>


            <div class="card-footer text-muted">
            Available
            </div>
        </div>



    </div>
    );
}

export default Reservations;