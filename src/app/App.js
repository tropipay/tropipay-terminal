import "./App.scss";
import './services/lang';
import Login from "../login/Login.jsx";
import store from './stores/AppStore';
import {Provider} from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        -
        <Login />
      </div>
    </Provider>
  );
}

export default App;
