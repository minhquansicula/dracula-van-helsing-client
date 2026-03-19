import React from "react";

const BoardZone = ({ zone }) => {
  return (
    <div className="bg-black/40 border border-game-bone-white/20 rounded-sm p-4 flex flex-col items-center justify-between h-40 sm:h-48 relative overflow-hidden">
      {/* Đường phân chia ở giữa */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-game-bone-white/10"></div>

      {/* Khu vực của Van Helsing (Human) - Nửa trên */}
      <div className="flex flex-wrap justify-center gap-1 z-10 w-full h-1/2 content-start pt-2">
        {Array.from({ length: zone.humanTokens }).map((_, i) => (
          <div
            key={`human-${i}`}
            className="w-5 h-5 rounded-full bg-game-bone-white border border-gray-500 shadow-md"
          ></div>
        ))}
      </div>

      {/* Số thứ tự Zone ở giữa */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-game-dark-teal border border-game-bone-white/30 rounded-full w-8 h-8 flex items-center justify-center font-black text-game-bone-white z-20 shadow-lg">
        {zone.zoneIndex}
      </div>

      {/* Khu vực của Dracula (Vampire) - Nửa dưới */}
      <div className="flex flex-wrap justify-center gap-1 z-10 w-full h-1/2 content-end pb-2">
        {Array.from({ length: zone.vampireTokens }).map((_, i) => (
          <div
            key={`vampire-${i}`}
            className="w-5 h-5 rounded-full bg-game-dracula-orange border border-red-900 shadow-[0_0_8px_rgba(225,85,37,0.8)]"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BoardZone;
