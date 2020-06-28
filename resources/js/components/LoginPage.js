import React, { useState } from 'react';
import Axios from 'axios';

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='row justify-content-center mt-5'>
            <div className="col-md-6">
                <div className="card shadow">
                    <div className="card-body">
                        <h2 className="card-title text-center">Login</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name='email'
                                    onChange={(e)=>{
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name='password'
                                    onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                        </form>
                        <button className='btn btn-primary' onClick={(e)=>{
                            Axios.post('/api/login', {email, password})
                                .then(response=>{
                                    console.log(response);
                                    props.history.push('/');
                                })
                                .catch(error=>{
                                    console.log(error.response.data)
                                });
                        }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
)
}

export default LoginPage;
