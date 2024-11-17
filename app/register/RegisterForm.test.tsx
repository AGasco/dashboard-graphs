import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

global.fetch = jest.fn();

describe('RegisterForm', () => {
  const push = jest.fn();

  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });

    (fetch as jest.Mock).mockClear();
    push.mockClear();
    (window.alert as jest.Mock).mockClear();
  });

  afterAll(() => {
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
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Registration successful!' })
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'securepassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

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
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email already exists.' })
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Jane Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'jane@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'anotherpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

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

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Alice' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'alice@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'alicepassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

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

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  test('handles network errors gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Bob' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'bob@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'bobpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

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
