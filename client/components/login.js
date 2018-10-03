import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/reducers/auth';

const LoginComponent = props => {
    const { handleSubmit } = props;
    return (
        <div>
            <form onSubmit={handleSubmit} name='login'>
                <label htmlFor='email'>Email: </label>
                <input name='email' type='text'></input>
                <label htmlFor='password'>Password: </label>
                <input name='password' type='text'></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

const mapdispatchToProps = dispatch => ({
    handleSubmit(evt) {
        evt.preventDefault()
        dispatch(auth(evt.target.email.value, evt.target.password.value, 'login'))
    }
})

export const Login = connect(null, mapdispatchToProps)(LoginComponent);