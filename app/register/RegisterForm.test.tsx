// RegisterForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('RegisterForm', () => {
  const push = jest.fn();

  // Mock window.alert before all tests
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  beforeEach(() => {
    // Mock the return value of useRouter
    (useRouter as jest.Mock).mockReturnValue({ push });

    // Clear mocks before each test
    (fetch as jest.Mock).mockClear();
    push.mockClear();
    (window.alert as jest.Mock).mockClear();
  });

  afterAll(() => {
    // Restore all mocks after all tests
    jest.restoreAllMocks();
  });

  test('renders registration form', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Register/i })
    ).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    // Mock successful registration response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Registration successful!' })
    });

    render(<RegisterForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'securepassword' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if the button is disabled and spinner is displayed
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Wait for the fetch call and subsequent actions
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'securepassword'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      expect(window.alert).toHaveBeenCalledWith(
        'Registration successful! Please log in.'
      );
      expect(push).toHaveBeenCalledWith('/login');
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  test('shows error on failed registration', async () => {
    // Mock failed registration response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email already exists.' })
    });

    render(<RegisterForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Jane Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'jane@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'anotherpassword' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if the button is disabled and spinner is displayed
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Wait for the fetch call and subsequent actions
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'anotherpassword'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      expect(window.alert).toHaveBeenCalledWith('Email already exists.');
      expect(push).not.toHaveBeenCalled();
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  test('displays loading spinner and disables button during submission', async () => {
    // Mock a delayed response
    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ message: 'Registration successful!' })
              }),
            100
          )
        )
    );

    render(<RegisterForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Alice' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'alice@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'alicepassword' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if the button is disabled and spinner is displayed
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Wait for the fetch call and subsequent actions
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Alice',
          email: 'alice@example.com',
          password: 'alicepassword'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      expect(window.alert).toHaveBeenCalledWith(
        'Registration successful! Please log in.'
      );
      expect(push).toHaveBeenCalledWith('/login');
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  test('does not submit form with empty required fields', async () => {
    render(<RegisterForm />);

    // Attempt to submit the form without filling required fields
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Since "email" and "password" are required, expect fetch not to be called
    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
      // If you have client-side validation error messages, you can check for them here
      // For example:
      // expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      // expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('handles network errors gracefully', async () => {
    // Mock network error
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<RegisterForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Bob' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'bob@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'bobpassword' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if the button is disabled and spinner is displayed
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Wait for the fetch call and subsequent actions
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Bob',
          email: 'bob@example.com',
          password: 'bobpassword'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      expect(window.alert).toHaveBeenCalledWith('Registration failed');
      expect(push).not.toHaveBeenCalled();
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });
});
