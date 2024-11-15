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
            'w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300',
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
