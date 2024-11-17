import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, id, containerClassName, className, ...props }, ref) => {
    const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className={containerClassName}>
        {label && (
          <label htmlFor={inputId} className="block mb-1 font-semibold">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 text-foreground border border-background-accent bg-background rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-saturated',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
