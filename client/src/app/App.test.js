import { render } from '@testing-library/react';
import App from './App';

test('render app', () => {
  const {container} = render(<App />);
  const mainMenu = container.querySelector('[class="MuiGrid-root MuiGrid-container"]');
  expect(mainMenu).toBeInTheDocument();
});
