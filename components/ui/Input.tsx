import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, containerClassName, className, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label && <label className="block mb-1 font-semibold">{label}</label>}
        <input
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
