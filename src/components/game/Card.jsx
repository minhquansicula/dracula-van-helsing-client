import React from "react";

// Map màu từ Enum của BE sang mã màu hiển thị
const COLOR_MAP = {
  0: {
    name: "Red",
    bg: "bg-card-red",
    border: "border-red-900",
    text: "text-white",
  }, // Red (Dracula)
  1: {
    name: "Purple",
    bg: "bg-card-purple",
    border: "border-purple-900",
    text: "text-white",
  }, // Purple
  2: {
    name: "Green",
    bg: "bg-card-green",
    border: "border-green-900",
    text: "text-white",
  }, // Green
  3: {
    name: "Yellow",
    bg: "bg-card-yellow",
    border: "border-yellow-700",
    text: "text-black",
  }, // Yellow
};

const Card = ({ cardData, isHidden = false, onClick, className = "" }) => {
  if (isHidden) {
    return (
      <div
        className={`w-20 h-28 sm:w-24 sm:h-36 rounded-md bg-game-dark-teal border-2 border-game-bone-white/20 shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-game-dark-teal to-black ${className}`}
      >
        <span className="text-3xl opacity-50">🦇</span>
      </div>
    );
  }

  const theme = COLOR_MAP[cardData?.color] || COLOR_MAP[0];

  return (
    <div
      onClick={onClick}
      className={`w-20 h-28 sm:w-24 sm:h-36 rounded-md ${theme.bg} ${theme.border} border-2 shadow-[0_0_15px_rgba(0,0,0,0.6)] flex flex-col justify-between p-2 relative cursor-pointer hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 ${className}`}
    >
      {/* Góc trên trái */}
      <div
        className={`text-lg sm:text-xl font-black ${theme.text} leading-none drop-shadow-md`}
      >
        {cardData?.value}
      </div>

      {/* Icon ở giữa (Tượng trưng cho Skill) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <span className="text-4xl sm:text-5xl font-serif">
          {cardData?.value}
        </span>
      </div>

      {/* Góc dưới phải (lộn ngược) */}
      <div
        className={`text-lg sm:text-xl font-black ${theme.text} leading-none rotate-180 drop-shadow-md`}
      >
        {cardData?.value}
      </div>
    </div>
  );
};

export default Card;
