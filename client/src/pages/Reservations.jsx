import React from 'react'
import DatePicker from "react-datepicker";
import { addDays,setHours,setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

class Reservations extends React.Component {

    state = {
        startDate: new Date(),
        startTime: setHours(setMinutes(new Date(), 0), 7),
        location: "",
        times: null,
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


      getAvailability(room) {

        var payload={
                room: room,
                date: this.state.startDate
            }
        
        console.log("DEBUG: "+payload.room);

        fetch("http://localhost:8080/availability",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(res => { 
                this.setState({ apiResponse: res });

                if (res.times !== undefined)
                {
                    console.log("Availability recieved");
                    console.log(this.state.apiResponse);
                    this.setState({location: room, times: res.times, step: 2})

                } else {
                    console.log("Availability failed");
                    console.log(this.state.apiResponse)
                    
                }
            });
    }

    render() {


        const availableTimes = [];

        if (this.state.times !== null) 
        {
            for (const [index, value] of this.state.times.entries()) {
                availableTimes.push(setHours(setMinutes(new Date(), 0), value),)
              }
              console.log(availableTimes);
        }


        return (
            <div className = "container mt-3">
                <div className="card shadow text-center mt-3">
                    <div className="card-header">
                        <i className="fas fa-calendar-day"></i> Reservations / Rentals
                    </div>
        { (this.state.step === 0) 
        ? 

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
             
                        />
                

                   
                </div>


:  ((this.state.step === 2) ) ?
        <div className="card-body">

        <h5 className="card-title">Okay! What time?</h5>

        <div className="row"> 
            <div className="col col-md-5 col-sm-12 col-lg-5 col-lg-5 mb-2"> 
            <div class="card text-center" >
                <div className="card-header">
                    <i className="fas fa-hourglass-half"></i> Reservation Details
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Location: <strong>{(this.state.location)}</strong> </li>
                    <li className="list-group-item">Date: <strong>{this.getFormattedDate(this.state.startDate)}</strong></li>
                </ul>
            </div>
            </div>
            <div className="col col-md-7 col-sm-12 col-lg-7 col-xl-7 "> 
            <div className="card border-primary">

                <div className="card-header"><i className="fas fa-clock"></i> Select Time</div>
                    <div class="card-body">
                    <h5 class="card-title">Select from available times</h5>
                        <DatePicker
                            selected={this.state.startTime}
                            onChange={date => this.pickTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            minTime={setHours(setMinutes(new Date(), 0), 7)}
                            maxTime={setHours(setMinutes(new Date(), 0), 19)}
                            includeTimes={availableTimes}
                            timeIntervals={60}
                            placeholderText="Select Time"
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </div>
                </div>
            </div>

        </div>

        <div>
            <hr />
            <small>Reservations only available between 7 AM - 7 PM</small>
        </div>
        </div>
 
    : ((this.state.step === 1) ) ?
      
        <div className="card-body">

        <h5 className="card-title">Gotcha. Which location?</h5>
            For <strong>{this.getFormattedDate(this.state.startDate)}</strong>
            <div className="mt-1" style={{height: 150+'px'}}>
                <button type="button" value="Rec Area" onClick={(e)=> this.getAvailability("Rec Area")} className="btn btn-primary btn-lg h-100 col-3"><i className="fas fa-home"></i> <p>Rec Area</p></button>
                <button type="button" value="Main Hall" onClick={(e)=> this.getAvailability("Main Hall")} className="btn btn-primary btn-lg ml-1 mr-1 h-100 col-3"><i className="fas fa-archway"></i> <p>Main Hall</p></button>
                <button type="button" value="Picnic Area" onClick={(e)=> this.getAvailability("Picnic Area")} className="btn btn-primary btn-lg h-100 col-3"><i className="fas fa-campground"></i> <p>Picnic Area</p></button>

            </div>

        </div>
    : null

}


    </div>
        </div>

        );
    }
}

export default Reservations;