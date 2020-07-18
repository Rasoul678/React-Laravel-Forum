import React, { useState } from 'react';
import Axios from 'axios';
import {useDispatch, useSelector} from "react-redux";

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);

    if(isAuthenticated){
        props.history.push('/');
    }

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
                                    className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    name='email'
                                    onChange={(e)=>{
                                        setEmail(e.target.value);
                                    }}
                                />
                                <div className="invalid-feedback">
                                    {errors.email && errors.email[0]}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    name='password'
                                    onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }}
                                />
                                <div className="invalid-feedback">
                                    {errors.password && errors.password[0]}
                                </div>
                            </div>
                            <div className='text-danger mb-2'>
                                {errors.message && errors.message}
                            </div>
                        </form>
                        <button className='btn btn-primary' onClick={(e)=>{
                            Axios.post('/api/auth/login', {email, password})
                                .then(response=>{
                                    console.log(response);
                                    localStorage.setItem("user", JSON.stringify(response.data.user));
                                    localStorage.setItem("access_token", response.data.access_token);
                                    window.axios.defaults.headers.common["Authorization"] =
                                        "Bearer " + response.data.access_token;
                                    dispatch({type: 'LOG_IN'});
                                    props.history.goBack();
                                })
                                .catch(error=>{
                                    if(error.response.data.errors){
                                        setErrors(error.response.data.errors);
                                    }else{
                                        setErrors(error.response.data);
                                    }
                                    localStorage.removeItem('access_token');
                                });
                        }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
)
}

export default LoginPage;
