import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('LoginForm', () => {
  const push = jest.fn();

  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });

    (signIn as jest.Mock).mockClear();
    push.mockClear();
    (window.alert as jest.Mock).mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      ok: true,
      error: null
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false
      });
      expect(push).toHaveBeenCalledWith('/');
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  test('shows error on invalid credentials', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      ok: false,
      error: 'Invalid credentials'
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'wrong@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'wrong@example.com',
        password: 'wrongpassword',
        redirect: false
      });
      expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
      expect(push).not.toHaveBeenCalled();
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  test('displays loading spinner and disables button during submission', async () => {
    (signIn as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                error: null
              }),
            100
          )
        )
    );

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'alice@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'alicepassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'alice@example.com',
        password: 'alicepassword',
        redirect: false
      });
      expect(push).toHaveBeenCalledWith('/');
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  test('does not submit form with empty required fields', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(signIn).not.toHaveBeenCalled();
    });
  });

  test('handles network errors gracefully', async () => {
    (signIn as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'bob@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'bobpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'bob@example.com',
        password: 'bobpassword',
        redirect: false
      });
      expect(window.alert).toHaveBeenCalledWith(
        'An unexpected error occurred. Please try again.'
      );
      expect(push).not.toHaveBeenCalled();
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });
});
