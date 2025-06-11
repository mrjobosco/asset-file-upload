import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button({ children, ...props }: ButtonProps): React.ReactElement {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-black text-white rounded-md font-light text-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-black/50 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
};
