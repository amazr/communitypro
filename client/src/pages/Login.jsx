import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import {UserContext} from '../context/UserContext';
import Auth from '../context/Auth';

class Login extends React.Component {

    static contextType = UserContext;

    constructor(props,context) {
        super(props,context);
        this.state = { 
            apiResponse: "",
            username: "",
            password: "",
            loginFailed: null,
            authenticated: false
        };
    }
    
    componentDidMount() {

      }

    authenticate(event) {
        event.preventDefault();
        var payload={
                username: this.state.username,
                password: this.state.password
            }
        
        console.log("DEBUG: "+payload.username);

        fetch("http://localhost:8080/login",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(res => { 
                this.setState({ apiResponse: res });

                if (res.isLoggedIn === true)
                {
                    console.log("Logged in");
                    Auth.login();
                    this.context.setUser(res.username);
                    console.log(this.state.apiResponse);
                    this.setState({ authenticated: true });
           
                } else {
                    console.log("Login failed");
                    console.log(this.state.apiResponse)
                    this.setState({ loginFailed: res.message });
                }
            });
    }

    render() {

        if (this.state.authenticated === true) {
            return <Redirect to='/' />
        }

        return (
            
            <div className = "container mt-5 col-md-8 col-lg-6 col-xl-5 col-sm-8">
            
                <div className="card shadow text-center bg-light mb-3" >
                    <div className="card-header"><i className="fas fa-hands-helping"></i> Login</div>
                    <div className="card-body">

                    { (this.state.loginFailed!=null) 
                    ? <div className="alert alert-danger" role="alert" id="passwordInvalid">
                            {this.state.loginFailed}
                        </div>
                    : null
                    }

                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user-circle"></i></span>
                                    <span className="input-group-text">Username</span>
                                </div>
                                <input type="text" className="form-control" onChange = {(event) => this.setState({username:event.target.value})} aria-label="Please enter your Username" />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                    <span className="input-group-text">Password </span>
                                </div>
                                <input type="password" className="form-control" onChange = {(event) => this.setState({password:event.target.value})} aria-label="Please enter your Password" />
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={(event) => this.authenticate(event)}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;