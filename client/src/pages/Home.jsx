import React from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import { Redirect } from "react-router-dom";



class Home extends React.Component {

    static contextType = UserContext;

    constructor(props,context) {
        super(props,context);
        this.state = { 
            apiResponse: "",
            user: this.context.user,
            reservations: null
        };
    }
    cancelReservation(id) {
        let payload={
            id: id
        }
        fetch("http://localhost:8080/cancelReservation",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(res => { 
                //this.setState({ apiResponse: res });

                if (res !== undefined)
                {
                    console.log("Cancellation recieved");
                    console.log(res);
                    this.getReservations();

                } else {
                    console.log("Cancellation failed");
                    console.log(this.state.apiResponse)
                    this.getReservations();
                    
                }
            });

    }
    getFormattedDate(date) {
        let year = date.getFullYear();
      
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }

    getReservations() {

        let payload={
                name: this.state.user
            }
        
        console.log("getReservations() => "+payload.name);

        fetch("http://localhost:8080/userReservations",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(res => { 
                //this.setState({ apiResponse: res });

                if (res.reservations.length !== 0)
                {
                    console.log("Reservations recieved");
                    console.log(res);
                    this.setState({reservations: res.reservations})

                } else {
                    console.log("No reservations");
                    this.setState({reservations: null})
                    
                }
            });
    }


    callAPI() {
        fetch("http://localhost:8080/")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    
    componentWillMount() {
        this.callAPI();
        this.getReservations();
    }

    render() {

        const madeReservationsDate = [];

        // Create a list of date objects that we can pass into time picker
        if (this.state.reservations !== null) 
        {
            for (const [index, value] of this.state.reservations.entries()) {
                madeReservationsDate.push(<tr key={index}><td><Link to="/" className="text-danger" onClick={(e)=> this.cancelReservation(value._id)} ><i class="fas fa-ban"></i></Link> {this.getFormattedDate(new Date(value.reservedDate))} {value.timeStart+":00"}</td><td>{value.room}</td><td><Link to={{
                    pathname: "/rental",
                    state: { 
                        r: value
                    }
                  }} className="badge badge-info" >Services</Link></td></tr>)
              }
        }

        if (this.context.user === undefined) {
            console.log("Not logged in redirecting")
            return <Redirect to='/login' />
        }

        return (
            <div className = "container col-12 mt-3">

            { (this.state.apiResponse !== undefined) 
                ? 
                    <div class="alert alert-success" role="alert">
                        <i className="fas fa-cogs"></i> {this.state.apiResponse}
                    </div>
                :
                    <div class="alert alert-danger" role="alert">
                        <i className="fas fa-plug"></i> No Connection!
                    </div>
            }



    <div className="">
                    <div className="card shadow text-center mb-3 mt-3">
                        <div className="card-header">
                            <i className="fas fa-calendar-day"></i> Reservations
                        </div>

                        <div className="card-body">

                    { (this.state.reservations === "No reservations found" || this.state.reservations === null) 
                    ? 
                        <div className="mb-5">
                            <h5 className="card-title">Nothing to see here...</h5>
                            <p className="card-text">Your reservations will appear here. So empty!</p>
                        </div>
                    :
                    <div className="">
          
                        <table className="table table-responsive-sm table-striped">
                        <thead>
                        <tr className="">
                            <th scope="col">When</th>
                            <th scope="col">Where</th>
                            <th scope="col">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                                {madeReservationsDate}
                        </tbody>
                        </table>
                    </div>

                    }

                        <Link to="/reservations" className="btn btn-info">Make a Reservation <i className="fas fa-arrow-circle-right"></i></Link>
                        </div>
                        <div className="card-footer text-muted">
                        { (this.state.reservations === "No reservations found" || this.state.reservations === null) 
                        ? 
                            "Available"
                        :
                            this.state.reservations.length + " reservations"
                        }
                        </div>
                    </div>
                </div>


    
            <div className="row">

            <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="card shadow text-center bg-light mt-3" >
                    <div className="card-header"><i className="fas fa-hands-helping"></i> Volunteer Sign-up</div>
                    <div className="card-body">
                    <h5 className="card-title mt-5">You are not currently volunteering.</h5>

                    <p className="card-text mb-5">Why not check it out? Help out your local community!</p>
                        

                    <Link to="/reservations" className="btn btn-info mb-4">Volunteer <i className="fas fa-arrow-circle-right"></i></Link>
                
                    </div>

                    <div className="card-footer text-muted">
                        Available
                    </div>
                </div>
            </div>


                <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="card shadow text-center mt-3">
                        <div className="card-header">
                            <i className="fas fa-donate"></i> Donate
                        </div>
                        <div className="card-body">
                       
                                <h5 className="card-title mt-5">Your donation helps us serve the community</h5>
                                <p className="card-text mb-5">Please consider donating!</p>
                         
                        <div class="custom-control custom-checkbox text-right">
                            <input type="checkbox" checked = {this.state.cater} className="custom-control-input" id="customControlValidation1" />
                            <label className="custom-control-label" for="customControlValidation1" ><i class="fas fa-user-secret"></i> Anonymous</label>
                        </div>
                        <div class="input-group mb-3">

                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
                            <div class="input-group-append">
                                <span class="input-group-text">.00</span>
                            </div>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Donate</button>
                            </div>
                        </div>
                        
                        </div>
                        <div className="card-footer text-muted">
                        Available
                        </div>
                    </div>
                </div>
            </div>


        </div>
        );
    }
}

export default Home;