import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { showSuccessMessage, showErrorMessage } from '../helpers/alerts';
import { API } from '../config';
import {authenticate, isAuth} from '../helpers/auth';

const Login = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: '',
        buttonText: 'Login'
    });
    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])
    const {email, password, error, success, buttonText } = state;

    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Login' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state , buttonText: 'Logging in'})
        // console.table({ name, email, password });
        try {
const response = await  axios.post(`${API}/login`, {
    email, password
})
 authenticate(response, () =>  isAuth() && isAuth.role === 'admin' ? Router.push('/admin') : Router.push('/user') )
}
        catch(error) {
            setState({
                ...state , buttonText: 'Login', error :error.response.data.error
            })
        }
     
    };

    const LoginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    value={email}
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    placeholder="Type your email"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    value={password}
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    placeholder="Type your password"
                    required
                />
            </div>
            <div className="form-group">
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <h1>Login</h1>
                
                <br />
                {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
                {LoginForm()}
                <hr />
                {JSON.stringify(state)}
            </div>
        </Layout>
    );
};

export default Login;
