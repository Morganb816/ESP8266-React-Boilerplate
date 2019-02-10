import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components';

export default withRouter(class Routes extends Component {
        render() {
            return (
                <Switch>
                    <Route path="*" component={Home} />
                </Switch>
            )
        }
});