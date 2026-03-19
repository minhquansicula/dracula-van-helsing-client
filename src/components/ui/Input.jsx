import React from "react";

const Input = ({ label, className = "", ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-game-bone-white text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        className="shadow appearance-none border border-game-dark-teal rounded w-full py-2 px-3 text-white bg-game-dark-teal bg-opacity-50 leading-tight focus:outline-none focus:ring-2 focus:ring-game-dracula-orange"
        {...props}
      />
    </div>
  );
};

export default Input;
