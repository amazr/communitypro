import React, { useState } from 'react'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "",
            username: "",
            password: "",
        };
    }
    
    authenticate(event) {

        event.preventDefault();

        var payload={
                username: this.state.username,
                password: this.state.password
            }
        
        console.log(payload);

        fetch("http://localhost:8080/login",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{ 'Content-Type': 'application/json' }
            })
            .then(res => res.text())
            .then(res => { 
                this.setState({ apiResponse: res });
            });


            console.log(this.state.apiResponse);
    }

    render() {
        return (
            <div className = "container mt-5">
            
                <div className="card shadow text-center bg-light mb-3" >
                    <div className="card-header"><i className="fas fa-hands-helping"></i> Login</div>
                    <div className="card-body">
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
                                    <span className="input-group-text">Password</span>
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