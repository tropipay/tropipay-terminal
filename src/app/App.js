
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';

import "./App.scss";
import './services/lang';

import Login from "../login/Login.jsx";
import store from './stores/AppStore';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
            <Route exact path='/' render={(props) => (<Login />)}/>
            <Route path='*' exact={true} render={() => (<Redirect to="/"/>)}/>
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
