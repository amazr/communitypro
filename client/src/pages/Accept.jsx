import React from 'react'
import { Link, Redirect} from 'react-router-dom';
import Cookies from "js-cookie";
import {UserContext} from '../context/UserContext';


class Accept extends React.Component {

    static contextType = UserContext;

    state = {
        message:  null,
        user: Cookies.get("username"),
        step: 0,
        r: this.props.location.state.r,
        accepted: false
      };

     getFormattedDate(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
      }

      cancelVol(id) {
        let payload={
            id: id
        }
        fetch("http://localhost:8080/cancelVolunteer",{
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
                    this.setState({accepted: true})
                
                } else {
                    console.log("Cancellation failed");
                    console.log(this.state.apiResponse)            
                }
            });
    }
    

    componentDidMount() {

    }

    render() {
        if (this.state.accepted === true) {
            return <Redirect to='/' />
        }
    
        if (this.context.user === undefined) {
            return <Redirect to='/login' />
        }

        return (
            <div className = "container mt-3">
                <div className="card shadow text-center mt-3">
                    <div className="card-header">
                        <i className="fas fa-calendar-day"></i> Confirm Service
                    </div>
        { (this.state.step === 0) 
        ? 
            <div className="card-body">
               <h5 className="card-title mb-3">We're glad we found you the help you need...</h5>

            <div className="mb-1">
            {(this.state.message !== null)
            ?
                
                    <small className="badge badge-warning"><strong>{this.state.message}</strong></small>
                
            : null
            }
            </div>
               <div className="row"> 

                    <div className="col col-md-5 col-sm-12 col-lg-5 col-lg-5 mb-2"> 
                        <div class="card text-center bg-success" >
                            <div className="card-header text-white">
                            <i class="fas fa-info-circle"></i> Service Details
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><i class="fas fa-map-tag"></i> Type: <strong>{(this.state.r.type)}</strong>  </li>
                                <li className="list-group-item"><i class="fas fa-calendar-check"></i> Date: <strong>{this.getFormattedDate(new Date(this.state.r.reservedDate))}</strong></li>
                                <li className="list-group-item"><i class="far fa-clock"></i> Time: <strong>{this.state.r.timeStart}:00</strong></li>
                            </ul>
                        </div>
                    </div>


                    <div className="col col-md-7 col-sm-12 col-lg-7 col-xl-7 "> 
                        <div className="card border-secondary">

                            <div className="card-header"><i className="fas fa-people-carry"></i> Services</div>
                                <div className="card-body text-center">

                                    <h1>Thank you for using our services!</h1>
                                    <p>Once you confirm our volunteer will reach out to you within 24 hours!</p>
                   

                                    <button type="button" onClick={() => this.cancelVol(this.state.r._id)} className="btn btn-info">Confirm</button>

                                </div>
                            </div>
                    </div>

                </div>

  
            <div className="mt-4">
                <Link to="/" className="btn btn-danger btn-md"><i class="fas fa-home"></i> Return Home</Link>
            </div>
                                <div>
            <hr />
            <small>Thank you!</small>
        </div>
                </div>

    : null

}


    </div>
        </div>

        );
    }
}

export default Accept;