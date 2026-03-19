import React from "react";

const Button = ({
  children,
  variant = "dracula",
  size = "md",
  className = "",
  isLoading,
  ...props
}) => {
  const baseClasses =
    "font-black rounded-sm uppercase tracking-widest transition-all duration-300 ease-in-out focus:outline-none transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    // Dracula - Fire & Fury
    dracula: `bg-game-dracula-orange text-white 
              border border-game-dracula-orange 
              hover:shadow-[0_0_20px_rgba(225,85,37,0.7)] 
              hover:-translate-y-0.5`,

    // Van Helsing - Blood & Determination
    vanhelsing: `bg-game-vanhelsing-blood text-game-bone-white 
                 border border-game-vanhelsing-blood 
                 hover:shadow-[0_0_20px_rgba(154,27,31,0.7)] 
                 hover:-translate-y-0.5`,
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm shadow-md",
    lg: "px-10 py-3.5 text-base shadow-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Đang triệu hồi...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
