import clsx from 'clsx';
import { forwardRef, SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  defaultOptionLabel?: string;
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, options, defaultOptionLabel, className, ...props }, ref) => {
    return (
      <div>
        {label && <label className="block mb-1 font-semibold">{label}</label>}
        <select
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 border border-background-accent bg-background text-foreground rounded appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-saturated',
            className
          )}
          {...props}
        >
          {defaultOptionLabel && <option value="">{defaultOptionLabel}</option>}
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
