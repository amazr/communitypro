import React from 'react'
import DatePicker from "react-datepicker";
import { Link, Redirect} from 'react-router-dom';
import { addDays,setHours,setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import {UserContext} from '../context/UserContext';


class Rentals extends React.Component {

    static contextType = UserContext;

    state = {
        message:  null,
        user: Cookies.get("username"),
        step: 0,
        r: this.props.location.state.r,
        chairs: null,
        signs: null,
        cater: null,
        message: null
      };

     getFormattedDate(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
      }

      handleCater () {
          if (this.state.cater != true) {
            this.setState({
                cater: true
            });
          } else {
            this.setState({
                cater: false
            });         
          }
      }

      getRental(){
      
        var payload={
                id: this.state.r._id,
            }

        console.log("rent() => "+payload.id);

        fetch("http://localhost:8080/rentalStatus",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(res => { 
                this.setState({ apiResponse: res });

                if (res !== undefined)
                {
                    console.log("Rental recieved");
                    console.log(this.state.apiResponse);
      
                    this.setState({chairs: res.chairs, signs: res.signs, cater: res.catered, message:res.message})

                } else {
                    console.log("Rental failed");
                    console.log(this.state.apiResponse)
                }
            });
      }

      rent(){
        if (this.state.cater === null)
        {
            this.setState({
                cater: false
              });
        }
    
        var payload={
                id: this.state.r._id,
                chairs: this.state.chairs,
                signs: this.state.signs,
                catered: this.state.cater
            }

        console.log("rent() => "+payload.id);

        fetch("http://localhost:8080/rent",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(res => { 
                this.setState({ apiResponse: res });

                if (res !== undefined)
                {
                    console.log("Rental recieved");
                    console.log(this.state.apiResponse);
                    this.setState({message: res.message})

                } else {
                    console.log("Rental failed");
                    console.log(this.state.apiResponse)
                }
            });
      }

    componentDidMount() {
        this.getRental();
    }

    render() {
    
        if (this.context.user === undefined) {
            return <Redirect to='/login' />
        }

        return (
            <div className = "container mt-3">
                <div className="card shadow text-center mt-3">
                    <div className="card-header">
                        <i className="fas fa-calendar-day"></i> Rental
                    </div>
        { (this.state.step === 0) 
        ? 
            <div className="card-body">
               <h5 className="card-title mb-3">Great! Let's add some stuff!</h5>

            <div className="mb-1">
            {(this.state.message !== null)
            ?
                
                    <small><strong>{this.state.message}</strong></small>
                
            : null
            }
            </div>
               <div className="row"> 

                    <div className="col col-md-5 col-sm-12 col-lg-5 col-lg-5 mb-2"> 
                        <div class="card text-center bg-success" >
                            <div className="card-header text-white">
                            <i class="fas fa-info-circle"></i> Reservation Details
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><i class="fas fa-map-marked-alt"></i> Location: <strong>{(this.state.r.room)}</strong>  </li>
                                <li className="list-group-item"><i class="fas fa-calendar-check"></i> Date: <strong>{this.getFormattedDate(new Date(this.state.r.reservedDate))}</strong></li>
                                <li className="list-group-item"><i class="far fa-clock"></i> Time: <strong>{this.state.r.timeStart}:00</strong></li>
                            </ul>
                        </div>
                    </div>


                    <div className="col col-md-7 col-sm-12 col-lg-7 col-xl-7 "> 
                        <div className="card border-secondary">

                            <div className="card-header"><i className="fas fa-people-carry"></i> Services</div>
                                <div className="card-body text-center">


                                <h5>Rent</h5>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fas fa-chair"></i></span>
                                        <span className="input-group-text">Chairs</span>
                                    </div>

                                    <select class="custom-select" value={this.state.chairs} onChange = {(event) => this.setState({chairs:event.target.value})}>
                                        <option value="">N/A</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                
                                </div>


                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fas fa-sign"></i></span>
                                        <span className="input-group-text">Signs</span>
                                    </div>

                                    <select className="custom-select" value={this.state.signs} onChange = {(event) => this.setState({signs:event.target.value})}>
                                        <option value="">N/A</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                
                                </div>

                                <h5>Other</h5>
                                    <div class="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" checked = {this.state.cater} className="custom-control-input" id="customControlValidation1" onChange = {() => this.handleCater()} />
                                        <label className="custom-control-label" for="customControlValidation1" ><i class="fas fa-utensils"></i> Add Catering</label>
                                
                                    </div>

                                    <button type="button" onClick={() => this.rent()} className="btn btn-info">Confirm</button>

                                </div>
                            </div>
                    </div>

                </div>

  
            <div className="mt-4">
                <Link to="/" className="btn btn-danger btn-md"><i class="fas fa-home"></i> Return Home</Link>
            </div>
                                <div>
            <hr />
            <small>You can add additional options to your reservation</small>
        </div>
                </div>

    : null

}


    </div>
        </div>

        );
    }
}

export default Rentals;