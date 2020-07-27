import React, { useState} from 'react';
import Axios from 'axios';
import {useSelector} from "react-redux";

const RegisterPage = (props)=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [errors, setErrors] = useState({});

    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);

    if(isAuthenticated){
        props.history.push('/');
    }

    return(
        <div className='row justify-content-center mt-5'>
            <div className="col-md-6">
                <div className="card shadow">
                    <div className="card-body">
                        <h2 className="card-title text-center">Register</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name='name'
                                    onChange={(e)=>{
                                        setName(e.target.value);
                                    }}
                                    autoFocus
                                />
                                <div className="invalid-feedback">
                                    {errors.email && errors.email[0]}
                                </div>
                            </div>
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
                            <div className="form-group">
                                <label htmlFor="password">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password_confirmation"
                                    name='password_confirmation'
                                    onChange={(e)=>{
                                        setConfirmationPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='text-danger mb-2'>
                                {errors.message && errors.message}
                            </div>
                        </form>
                        <button className='btn btn-primary' onClick={(e)=>{
                            const formData = {
                                name,
                                email,
                                password,
                                password_confirmation: confirmationPassword
                            }
                            Axios.post('/api/auth/register', formData)
                                .then(response=>{
                                    console.log(response);
                                    props.history.push('/');
                                    flash("You can log in now.", "success");
                                })
                                .catch(error=>{
                                    console.log(error);
                                });
                        }}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
