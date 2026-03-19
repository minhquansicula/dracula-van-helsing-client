import React from "react";

const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label className="block text-game-bone-white text-xs font-black uppercase tracking-widest mb-1.5 shadow-text-sm">
          {label}
        </label>
      )}
      <input
        className="w-full px-4 py-2.5 
                   bg-black/40 text-game-bone-white 
                   border border-game-dark-teal 
                   rounded-sm 
                   placeholder:text-game-bone-white/30 
                   text-sm 
                   transition-all duration-300 ease-in-out
                   focus:outline-none focus:border-game-dracula-orange focus:ring-1 focus:ring-game-dracula-orange
                   focus:shadow-[0_0_15px_rgba(225,85,37,0.5)]"
        {...props}
      />
      {error && (
        <p className="text-game-dracula-orange text-xs mt-1.5 italic shadow-text-xs">
          * {error}
        </p>
      )}
    </div>
  );
};

export default Input;
