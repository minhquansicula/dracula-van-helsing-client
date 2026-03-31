import React from "react";

const smoothTransition =
  "transition-[transform,opacity,filter,box-shadow] duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu";

const FACTION = { DRACULA: 0, VAN_HELSING: 1 };

const PlayerStatusWidget = ({ player, type }) => {
  const isSelf = type === "self";

  // Xác định phe để áp dụng màu sắc và UI (Mặc định Dracula nếu chưa có data)
  const isDracula = player?.faction !== FACTION.VAN_HELSING;

  // Cấu hình Theme theo Phe phái
  const theme = isDracula
    ? {
        textColor: "text-game-dracula-orange",
        borderColor: "border-game-dracula-orange/40",
        glowColor: "rgba(225,85,37,0.3)",
        gradientFrom: "from-game-dracula-orange/20",
        factionName: "Lãnh Chúa Dracula",
      }
    : {
        textColor: "text-game-vanhelsing-blood",
        borderColor: "border-game-vanhelsing-blood/40",
        glowColor: "rgba(154,27,31,0.3)",
        gradientFrom: "from-game-vanhelsing-blood/20",
        factionName: "Thợ Săn Van Helsing",
      };

  const displayHealth = Math.max(0, player?.health || 0);

  return (
    <div
      className={`relative flex flex-col items-center p-4 xl:p-5 bg-black/80 backdrop-blur-md border-y-2 border-x ${theme.borderColor} min-w-[160px] xl:min-w-[180px] ${smoothTransition} hover:scale-105 group overflow-hidden select-none`}
      style={{
        boxShadow: `0 15px 35px rgba(0,0,0,0.8), inset 0 0 20px ${theme.glowColor}`,
        // Cắt 4 góc để tạo hình dáng thẻ bài/bảng tên cổ điển thay vì bo tròn
        clipPath:
          "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)",
      }}
    >
      {/* Background Glow */}
      <div
        className={`absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b ${theme.gradientFrom} to-transparent opacity-50 pointer-events-none`}
      />

      {/* Label: Bản thân / Đối thủ */}
      <div className="absolute top-0 w-full text-center bg-black/60 border-b border-white/5 py-1 z-10">
        <span className="text-[8px] xl:text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">
          {isSelf ? "Bản Thân" : "Đối Thủ"}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center gap-1 relative z-20 w-full">
        {/* Tên người chơi */}
        <div className="text-lg xl:text-xl font-black text-white uppercase tracking-wider truncate w-full text-center font-['Playfair_Display'] drop-shadow-md">
          {player?.username || "Vô Danh"}
        </div>

        {/* Tên Phe phái */}
        <div
          className={`text-[9px] xl:text-[10px] ${theme.textColor} uppercase tracking-[0.2em] font-bold mb-2`}
        >
          {theme.factionName}
        </div>

        {/* Thanh gạch ngang phân cách */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-2" />

        {/* Khu vực Thông số (HP hoặc Biểu tượng Thợ săn) */}
        <div className="mt-1 w-full flex justify-center items-center h-12">
          {isDracula ? (
            // Dracula hiển thị Máu (HP)
            <div
              className={`text-4xl xl:text-5xl font-black ${theme.textColor} flex items-baseline gap-1`}
              style={{ textShadow: `0 0 20px ${theme.glowColor}` }}
            >
              {displayHealth}
              <span className="text-[10px] xl:text-xs font-bold text-white/50 tracking-[0.2em] uppercase">
                HP
              </span>
            </div>
          ) : (
            // Van Helsing không có Máu, hiển thị icon Thánh Giá
            <div className="flex flex-col items-center opacity-80 mt-1">
              <svg
                className={`w-6 h-6 mb-1 ${theme.textColor}`}
                style={{ filter: `drop-shadow(0 0 8px ${theme.glowColor})` }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M5 8h14" />
              </svg>
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 font-bold">
                Thợ Săn
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerStatusWidget;
