import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={clsx(
        'flex flex-col p-4 bg-backgroundAccent text-foreground rounded shadow-sm shadow-foregroundAccent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
