import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center px-3 py-2 text-white bg-primary rounded hover:bg-blue-600',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
