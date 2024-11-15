import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={clsx(
        'flex flex-col p-4 bg-white rounded shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
