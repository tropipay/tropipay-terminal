import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from '../../models/AppStore';
import Menu from './Menu';

test('renders menu', () => {
  const {container} = render(
    <BrowserRouter>
      <Provider store={store}> 
        <Menu /> 
      </Provider>
    </BrowserRouter>
  );
  const mainMenu = container.querySelector('[id="main-menu"]')
  expect(mainMenu).toBeInTheDocument();
});
