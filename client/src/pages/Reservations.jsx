import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { addDays,setHours,setMinutes } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

class Reservations extends React.Component {

    state = {
        startDate: new Date(),
        startTime: setHours(setMinutes(new Date(), 0), 7),
        step: 0
      };

     getFormattedDate(date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }
    
      handleChange = date => {
        this.setState({
          startDate: date
        });
      };

      pickTime (time) {
        console.log(time);
        this.setState({startTime: time})
      }

    render() {

        return (
            <div className = "container mt-3">
        { (this.state.step === 0) 
        ? 
            <div className="card shadow text-center mt-3">
                <div className="card-header">
                    <i className="fas fa-calendar-day"></i> Reservations / Rentals
                </div>
                <div className="card-body">

               <h5 className="card-title">When do you wish to make the reservation for?</h5>
                        <div className="alert alert-warning" role="alert">
                           You can only make Reservation a maximum of 31 days in advance!
                        </div>
    
                        <DatePicker
                            selected={this.state.startDate}
                            placeholderText="Click to select a date"
                            onChange={date => this.setState({startDate: date, step: 1})}
                            minDate={new Date()}
                            inline
                            maxDate={addDays(new Date(), 31)}
                            placeholderText="Select a date between today and 31 days in the future"
                        />
                

                   

                    <div className="mt-2 collapse">
                        <a href="#" className="btn btn-info">Next <i className="fas fa-arrow-circle-right"></i></a>
                    </div>
 
                </div>


                <div className="card-footer text-muted">
                Available
                </div>
            </div>

:   <div className="card shadow text-center mt-3">
        <div className="card-header">
            <i className="fas fa-calendar-day"></i> Reservations / Rentals
        </div>
        <div className="card-body">

        <h5 className="card-title">Okay! What time?</h5>
            {this.getFormattedDate(this.state.startDate)}
            <div className="alert alert-warning" role="alert">
            Between 7 AM - 8 PM
            </div>

        <DatePicker
            selected={this.state.startTime}
            onChange={date => this.pickTime(date)}
            showTimeSelect
            showTimeSelectOnly
            minTime={setHours(setMinutes(new Date(), 0), 7)}
            maxTime={setHours(setMinutes(new Date(), 0), 20)}
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
        />
        </div>
        </div>
}



        </div>

        );
    }
}

export default Reservations;