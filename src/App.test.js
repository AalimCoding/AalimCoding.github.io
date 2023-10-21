import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Welcome To My Project Page! Click Below To See My Portfolio!');
  expect(linkElement).toBeInTheDocument();
});
