import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <div>
        <label className="block mb-1 font-semibold">{label}</label>
        <input
          ref={ref}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
