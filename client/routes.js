import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Login, SignUp, Home } from './components';
import { me } from './store/store';

class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData()
    }
    render() {
        const { isLoggedIn } = this.props
        return (
            <Switch>
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={Login} />
                {isLoggedIn && (
                    <Switch>
                        <Route path='/home' component={Home} />
                    </Switch>
                )}
                <Route path="*" component={Login} />
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: !!state.user.id
});
const mapDispatchToProps = dispatch => ({
    loadInitialData() {
        dispatch(me())
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));