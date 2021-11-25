import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from '../app/stores/AppStore';
import Menu from './Menu';

test('renders menu', () => {
  render(<BrowserRouter><Provider store={store}> <Menu /> </Provider></BrowserRouter>);
  const linkElement = screen.getByText(/Menu/i);
  expect(linkElement).toBeInTheDocument();
});
