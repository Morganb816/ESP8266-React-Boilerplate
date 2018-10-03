import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/reducers/auth';

export class HomeComponent extends Component {
    render() {
        const { handleClick } = this.props;
        return (
            <div>
                <div>{this.props.user.email}</div>
                <button onClick={handleClick}>Logout</button>
            </div>
        )
    }
}

const mapState = state => ({
    user: state.user
});

const mapDispatch = dispatch => ({
    handleClick() {
        dispatch(logout());
    }
})

export const Home = connect(mapState, mapDispatch)(HomeComponent);