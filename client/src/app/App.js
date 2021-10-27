
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';

import "./App.scss";
import './services/lang';

import Demo from "../demo/Demo.jsx";
import store from './stores/AppStore';
import { ProvideAuth, RoutePrivate, authorizationCode } from '../security/services/auth';
import Login from '../security/components/login';
import Menu from '../menu/menu';

function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <ProvideAuth>
              <Menu />
              <Switch>
                  <Route exact path='/' render={(props) => (<Demo />)}/>
                  <Route exact path="/public">
                      <h3>Public</h3>
                  </Route>
                  <RoutePrivate exact path="/private">
                      <h3>Private</h3>
                  </RoutePrivate>

                  <Route exact path='/auth/callback' render={authorizationCode}/>

                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route path='*' exact={true} render={() => (<Redirect to="/"/>)}/>
              </Switch>
          </ProvideAuth>
        </Provider>
      </BrowserRouter>
  );
}

export default App;

