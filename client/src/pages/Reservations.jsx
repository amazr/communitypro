import React from 'react'
import DatePicker from "react-datepicker";
import { Link, Redirect} from 'react-router-dom';
import { addDays,setHours,setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import {UserContext} from '../context/UserContext';


class Reservations extends React.Component {

    static contextType = UserContext;

    state = {
        startDate: new Date(),
        startTime: setHours(setMinutes(new Date(), 0), 7),
        location: "",
        user: Cookies.get("username"),
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

      makeReservation(time){

        this.pickTime(time);
        let rentalStart = time.getHours();
        let rentalEnd = rentalStart+1;
        
        var payload={
                room: this.state.location,
                timeStart: rentalStart,
                timeEnd: rentalEnd,
                status: "confirmed",
                reservedDate: this.state.startDate,
                name: this.state.user
            }

        console.log("makeReservation() => "+payload.name+", "+payload.timeStart);

        fetch("http://localhost:8080/reserve",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(res => { 
                this.setState({ apiResponse: res });

                if (res !== undefined)
                {
                    console.log("Reservation recieved");
                    console.log(this.state.apiResponse);
                    this.setState({step: 3})

                } else {
                    console.log("Reservation failed");
                    console.log(this.state.apiResponse)
                }
            });
      }

      getAvailability(room) {

        this.state.startDate.setHours(0, 0, 0, 0);

        var payload={
                room: room,
                date: this.state.startDate
            }
        
        console.log("getAvailability() => "+payload.room+", "+payload.date);

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

        if (this.context.user === undefined) {
            return <Redirect to='/login' />
        }
        const availableTimes = [];
        // Create a list of date objects that we can pass into time picker
        if (this.state.times !== null) 
        {
            for (const [index, value] of this.state.times.entries()) {
                availableTimes.push(setHours(setMinutes(new Date(), 0), value),)
              }
        }

        return (
            <div className = "container mt-3">
                <div className="card shadow text-center mt-3">
                    <div className="card-header">
                        <i className="fas fa-calendar-day"></i> Reservations
                    </div>
        { (this.state.step === 0) 
        ? 

            <div className="card-body">
               <h5 className="card-title mb-4">When do you wish to make the reservation for?</h5>
    
                        <DatePicker
                            selected={this.state.startDate}
                            placeholderText="Click to select a date"
                            onChange={date => this.setState({startDate: date, step: 1})}
                            minDate={new Date()}
                            inline
                            maxDate={addDays(new Date(), 31)}
                        />

            <div className="mt-4">
                <Link to="/" className="btn btn-danger btn-md"><i class="fas fa-home"></i> Return Home</Link>
            </div>
                                <div>
            <hr />
            <small>You can only make Reservation a maximum of 31 days in advance!</small>
        </div>
                </div>


:  ((this.state.step === 2) ) ?
        <div className="card-body">

        <h5 className="card-title">Okay! What time?</h5>

        <div className="mb-1">
            <small><strong>{this.state.apiResponse.message}</strong></small>
        </div>

        <div className="row"> 
            <div className="col col-md-5 col-sm-12 col-lg-5 col-lg-5 mb-2"> 
            <div class="card text-center" >
                <div className="card-header">
                    <i class="fas fa-info-circle"></i> Reservation Details
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><i class="fas fa-map-marked-alt"></i> Location: <strong>{(this.state.location)}</strong> </li>
                    <li className="list-group-item"><i class="fas fa-calendar-check"></i> Date: <strong>{this.getFormattedDate(this.state.startDate)}</strong></li>
                </ul>
            </div>
            </div>
            <div className="col col-md-7 col-sm-12 col-lg-7 col-xl-7 "> 
            <div className="card border-primary">

                <div className="card-header"><i className="fas fa-clock"></i> Select Time</div>
                    <div className="card-body">

                    <h5 class="card-title">Select from available times</h5>
                        <DatePicker
                            selected={this.state.startTime}
                            showTimeSelect
                            showTimeSelectOnly
                            minTime={setHours(setMinutes(new Date(), 0), 7)}
                            maxTime={setHours(setMinutes(new Date(), 0), 19)}
                            includeTimes={availableTimes}
                            onChange={date => this.makeReservation(date)}
                            timeIntervals={60}
                            placeholderText="Select Time"
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </div>
                </div>
            </div>
            
            <div className="mt-4 text-center col-12">
                <button type="button" onClick={(e)=> this.setState({step: this.state.step-1})} className="btn btn-danger btn-lg"><i class="fas fa-arrow-circle-left"></i> Back</button>
            </div>

        </div>

        <div>
            <hr />
            <small>Reservations only available between 7 AM - 7 PM</small>
        </div>
        </div>
:((this.state.step === 3) ) ?
  <div className="card-body">

  <h5 className="card-title">Confirmed!</h5>

  <div className="row"> 
      <div className="col col-md-5 col-sm-12 col-lg-5 col-lg-5 mb-2"> 
      <div class="card text-center bg-success" >
          <div className="card-header text-white">
          <i class="fas fa-info-circle"></i> Reservation Details
          </div>
          <ul className="list-group list-group-flush">
              <li className="list-group-item"><i class="fas fa-map-marked-alt"></i> Location: <strong>{(this.state.location)}</strong>  </li>
              <li className="list-group-item"><i class="fas fa-calendar-check"></i> Date: <strong>{this.getFormattedDate(this.state.startDate)}</strong></li>
              <li className="list-group-item"><i class="far fa-clock"></i> Time: <strong>{this.state.startTime.getHours()}:00</strong></li>
          </ul>
      </div>
      </div>
      <div className="col col-md-7 col-sm-12 col-lg-7 col-xl-7 "> 
      <div className="card text-white bg-success">

          <div className="card-header"><i className="fas fa-clock"></i> Thank You!</div>
              <div class="card-body">
              <h5 class="card-title">Your reservation has been confirmed!</h5>
                    <h1><i className="fas fa-check"></i></h1>
                    <Link to="/" className="btn btn-outline-success bg-white">Ok!</Link>
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
            <small>For <strong>{this.getFormattedDate(this.state.startDate)}</strong></small>
            <div className="mt-3" style=
            {{height: 150+'px'}}>
                <button type="button" value="Rec Area" onClick={(e)=> this.getAvailability("Rec Area")} className="btn btn-primary btn-lg h-100 col-3"><i className="fas fa-home"></i> <div>Rec Area</div></button>
                <button type="button" value="Main Hall" onClick={(e)=> this.getAvailability("Main Hall")} className="btn btn-primary btn-lg ml-1 mr-1 h-100 col-3"><i className="fas fa-archway"></i> <div>Main Hall</div></button>
                <button type="button" value="Picnic Area" onClick={(e)=> this.getAvailability("Picnic Area")} className="btn btn-primary btn-lg h-100 col-3"><i className="fas fa-campground"></i> <div>Picnic Area</div></button>

            </div>
            <div className="mt-4">
                <button type="button" onClick={(e)=> this.setState({step: this.state.step-1})} className="btn btn-danger btn-lg"><i class="fas fa-arrow-circle-left"></i> Back</button>
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