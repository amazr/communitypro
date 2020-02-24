import React, { useState } from 'react'

const Login = () => {
    return (
        <div class = "container mt-5">
        
            <div class="card shadow text-center bg-light mb-3" >
                <div class="card-header"><i class="fas fa-hands-helping"></i> Login</div>
                <div class="card-body">
                    <form>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user-circle"></i></span>
                                <span class="input-group-text">Username</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Please enter your Username" />
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                <span class="input-group-text">Password</span>
                            </div>
                            <input type="password" class="form-control" aria-label="Please enter your Password" />
                        </div>

                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
   


        </div>
    );
}

export default Login;