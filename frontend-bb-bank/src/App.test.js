import { render, screen } from '@testing-library/react';
import BankApp from './BankAppApp';

test('renders learn react link', () => {
  render(<BankApp/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
