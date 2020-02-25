import React from 'react'
import DatePicker from "react-datepicker";
import { addDays,setHours,setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

class Reservations extends React.Component {

    state = {
        startDate: new Date(),
        startTime: setHours(setMinutes(new Date(), 0), 7),
        location: "",
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
            For <strong>{this.getFormattedDate(this.state.startDate)}</strong> in <strong>{(this.state.location)}</strong> 
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
 
    : ((this.state.step === 1) ) ?
      
        <div className="card-body">

        <h5 className="card-title">Gotcha. Which location?</h5>
            For <strong>{this.getFormattedDate(this.state.startDate)}</strong>
            <div className="mt-1" style={{height: 150+'px'}}>
                <button type="button" onClick={()=>{this.setState({location: "Rec Area", step: 2})}} className="btn btn-primary btn-lg h-100 col-3"><i className="fas fa-home"></i> <p>Rec Area</p></button>
                <button type="button" onClick={()=>{this.setState({location: "Main Hall", step: 2})}} className="btn btn-primary btn-lg ml-1 mr-1 h-100 col-3"><i className="fas fa-archway"></i> <p>Main Hall</p></button>
                <button type="button" onClick={()=>{this.setState({location: "Picnic Area", step: 2})}} className="btn btn-primary btn-lg h-100 col-3"><i className="fas fa-campground"></i> <p>Picnic Area</p></button>

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