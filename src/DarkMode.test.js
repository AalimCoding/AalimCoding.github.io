import { render, fireEvent } from '@testing-library/react';
import DarkModeSwitch from './DarkModeSwitch';
import { ThemeProvider } from './ThemeContext';

test('Dark mode switch toggles the theme', () => {
  const { getByTestId } = render(
    <ThemeProvider>
      <DarkModeSwitch />
    </ThemeProvider>
  );

  const darkModeSwitch = getByTestId('darkModeSwitch');
  expect(darkModeSwitch).toHaveStyle('background: white'); // Initial style check

  fireEvent.click(darkModeSwitch); // Simulate a click

  expect(darkModeSwitch).toHaveStyle('background: black'); // Updated style after click
});
