import React from "react";

const Button = ({
  children,
  variant = "dracula",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-bold rounded focus:outline-none transition ease-in-out duration-150";

  const variants = {
    // Nút hành động chính, nóng bỏng (ví dụ: Tạo phòng, Bắt đầu)
    dracula:
      "bg-game-dracula-orange text-white hover:bg-opacity-90 active:bg-opacity-80",
    // Nút hành động phụ, lạnh lẽo (ví dụ: Huỷ, Quay lại)
    vanhelsing:
      "bg-game-vanhelsing-blood text-white hover:bg-opacity-90 active:bg-opacity-80",
    // Nút ít quan trọng hơn, lạnh (ví dụ: Vào phòng)
    cold: "bg-game-dark-teal text-game-bone-white border border-game-bone-white hover:bg-opacity-10 active:bg-opacity-20",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-md",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
