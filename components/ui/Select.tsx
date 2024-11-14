import { forwardRef, SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, options, ...props }, ref) => {
    return (
      <div>
        {label && <label className="block mb-1 font-semibold">{label}</label>}
        <select
          ref={ref}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
