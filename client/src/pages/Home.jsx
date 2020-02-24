import React, { useState } from 'react'

const Home = () => {
    return (
        <div class = "container mt-3">
        

        <div class="card shadow text-center bg-light mb-3" >
            <div class="card-header"><i class="fas fa-hands-helping"></i> Volunteer Sign-up</div>
            <div class="card-body">
            <h5 class="card-title">You currently don't have a volunteer availability schedule!</h5>
            <p class="card-text">Add a new volunteer availability to be contacted for volunteer opportunitities to help you local community.</p>
            </div>
        </div>
   


        <div class="card shadow text-center mt-3">
            <div class="card-header">
                <i class="fas fa-calendar-day"></i> Reservations / Rentals
            </div>
            <div class="card-body">
            <h5 class="card-title">Nothing to see here...</h5>
            <p class="card-text">Your reservations will appear here. So empty!</p>
            <a href="#" class="btn btn-info">Make a Reservation <i class="fas fa-arrow-circle-right"></i></a>
            </div>
            <div class="card-footer text-muted">
            Available
            </div>
        </div>


        <div class="card shadow text-center mt-3">
            <div class="card-header">
                <i class="fas fa-wheelchair"></i> Homecare
            </div>
            <div class="card-body">
            <h5 class="card-title">Nothing to see here...</h5>
            <p class="card-text">Need to request community service or homecare?</p>
            <a href="#" class="btn btn-info">Make a Request <i class="fas fa-arrow-circle-right"></i></a>
            </div>
            <div class="card-footer text-muted">
            Available
            </div>
        </div>


    </div>
    );
}

export default Home;