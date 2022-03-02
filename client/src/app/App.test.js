import { render } from '@testing-library/react';
import App from './App';

test('render app', () => {
  const {container} = render(<App />);
  const page = container.querySelector('[class="page-container"]');
});
