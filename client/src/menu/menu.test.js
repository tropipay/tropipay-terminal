import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Menu from './menu';

test('renders menu', () => {
  render(<BrowserRouter> <Menu /> </BrowserRouter>);
  const linkElement = screen.getByText(/Menu/i);
  expect(linkElement).toBeInTheDocument();
});
