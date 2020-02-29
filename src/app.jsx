import React from 'react';
import { connect } from 'react-redux';

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

import { HashRouter, Switch, Route, Redirect} from 'react-router-dom';


class App extends React.Component {

    render() {

        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/admin' component={Admin} history={this.props.history}></Route>
                    </Switch>
                    <Redirect to='/login'></Redirect>
                </HashRouter>
            </div>
        )
    }
}

export default connect()(App);