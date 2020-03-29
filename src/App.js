import React from 'react';
import './App.css';

import Tienda from './containers/Tienda'
import Pedidos from './containers/Pedidos'
import SignUp from './containers/SignUp/SignUp'
import Login from "./containers/Login/Login";


import { Route, Switch, Redirect } from 'react-router-dom';
import * as ROUTES from './constants/routes';

export const AppContext = React.createContext(null);

class App extends React.Component {

    state = {
        auth: false,
        authData: {}
    }

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('token'));
        console.log(token)
        if (token != null) {
            this.setState({
                auth: true,
                authData: { ...token }
            })
        }
    }


    setAuthentication = (auth,data) => {
        this.setState({
            auth: auth,
            authData: data
        })
    }

    logoutUser = () => {
        this.setState({
            auth: false,
            authData: {}
        })
        localStorage.removeItem('token')
    }

    render() {
    return (
        <AppContext.Provider value={{app: this}}>
            <div className="App">
                <Switch>
                    <Route exact path={ROUTES.TIENDA}
                           render={(props) => <Tienda{...props} isAuthed={this.state.auth} logout={this.logoutUser}/>}  />
                    <Route path={ROUTES.PEDIDOS}
                           render={(props) => <Pedidos{...props} isAuthed={this.state.auth} userId={this.state.authData.localId}/>}  />
                    <Route exact path={ROUTES.SIGN_UP}
                           render={(props) => <SignUp{...props} isAuthed={this.state.auth} setAuthentication={this.setAuthentication} />} />
                    <Route exact path={ROUTES.LOGIN}
                           render={(props) => <Login{...props} isAuthed={this.state.auth} setAuthentication={this.setAuthentication} />} />
                    <Redirect from="/" to={ROUTES.TIENDA} />
                </Switch>
            </div>
        </AppContext.Provider>
    );
  }
}

export default App;
