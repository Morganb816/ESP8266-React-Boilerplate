import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/store';

const SignUpComponent = props => {
    const { handleSubmit } = props;
    return (
        <div>
            <form onSubmit={handleSubmit} name='signup'>
                <label htmlFor='email'>Email: </label>
                <input name='email' type='text'></input>
                <label htmlFor='password'>Password: </label>
                <input name='password' type='text'></input>
                <label htmlFor='passwordValidate'>Retype Password: </label>
                <input name='passwordValidate' type='text'></input>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

const mapdispatchToProps = dispatch => ({
    handleSubmit(evt) {
        evt.preventDefault()
        if (evt.target.password.value === evt.target.passwordValidate.value) {
            dispatch(auth(evt.target.email.value, evt.target.password.value, 'signup'))
        } else {
            alert('Please check your password matches')
        }
    }
})

export const SignUp = connect(null, mapdispatchToProps)(SignUpComponent);