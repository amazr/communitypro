import React, { useState } from 'react'

const Login = () => {
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
                            <input type="text" className="form-control" aria-label="Please enter your Username" />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                <span className="input-group-text">Password</span>
                            </div>
                            <input type="password" className="form-control" aria-label="Please enter your Password" />
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
   


        </div>
    );
}

export default Login;