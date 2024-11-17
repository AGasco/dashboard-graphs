import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('LoginForm', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (signIn as jest.Mock).mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false
      });
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  test('shows error on invalid credentials', async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: 'Invalid credentials' });
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'wrong@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  test('displays loading spinner and disables button during submission', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check if the spinner is present
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
      expect(push).toHaveBeenCalledWith('/');
    });
  });
});
