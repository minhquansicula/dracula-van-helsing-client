import React from "react";
import Button from "../../ui/Button";

const FACTION = { DRACULA: 0, VAN_HELSING: 1 };

const RoleSelectionPhase = ({ selectedRole, isLoading, onSelectRole }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-1000">
      <header className="text-center mb-16 flex-shrink-0">
        <h3 className="text-5xl md:text-6xl font-black text-game-bone-white uppercase mb-6 font-['Playfair_Display'] tracking-tighter drop-shadow-2xl">
          Chọn Số Phận
        </h3>
        <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent mx-auto"></div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl items-stretch">
        {/* Option 1: Dracula */}
        <div
          className={`group relative bg-black/40 p-10 md:p-14 border transition-all duration-500 flex flex-col items-center h-full overflow-hidden
            ${
              selectedRole === FACTION.DRACULA
                ? "border-game-dracula-orange shadow-[0_0_50px_rgba(225,85,37,0.3)] scale-105 z-10 bg-game-dracula-orange/5"
                : selectedRole !== null
                  ? "border-white/5 opacity-30 scale-95 grayscale"
                  : "border-white/10 hover:border-game-dracula-orange/50 hover:shadow-[0_0_40px_rgba(225,85,37,0.15)] hover:-translate-y-2 cursor-pointer"
            }`}
          onClick={() => !isLoading && onSelectRole(FACTION.DRACULA)}
        >
          <div className="h-24 flex items-end mb-10">
            <div
              className={`w-px transition-all duration-700 ease-out group-hover:h-24 ${selectedRole === FACTION.DRACULA ? "h-24 bg-game-dracula-orange shadow-[0_0_20px_rgba(225,85,37,1)]" : "h-12 bg-game-dracula-orange/40"}`}
            />
          </div>
          <h4 className="text-3xl md:text-4xl font-black text-game-bone-white uppercase tracking-tight mb-6 font-['Playfair_Display'] group-hover:text-game-dracula-orange transition-colors">
            Dracula
          </h4>
          <p className="text-game-bone-white/50 text-[11px] text-center uppercase tracking-[0.2em] leading-loose mb-12 flex-grow max-w-[280px]">
            Sở hữu 12 HP. Nhiệm vụ: Lan truyền Ma cà rồng ra ít nhất 1 khu vực
            hoặc tiêu diệt kẻ đi săn.
          </p>
          <Button
            variant="dracula"
            size="lg"
            className={`w-full transition-all duration-500 font-['Playfair_Display'] font-bold tracking-[0.2em] ${selectedRole === FACTION.DRACULA ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            isLoading={isLoading && selectedRole === FACTION.DRACULA}
            disabled={isLoading || selectedRole !== null}
          >
            {selectedRole === FACTION.DRACULA
              ? "Đã Khóa Lựa Chọn"
              : "Lãnh Đạo Đêm Tối"}
          </Button>
        </div>

        {/* Option 2: Van Helsing */}
        <div
          className={`group relative bg-black/40 p-10 md:p-14 border transition-all duration-500 flex flex-col items-center h-full overflow-hidden
            ${
              selectedRole === FACTION.VAN_HELSING
                ? "border-game-vanhelsing-blood shadow-[0_0_50px_rgba(154,27,31,0.3)] scale-105 z-10 bg-game-vanhelsing-blood/5"
                : selectedRole !== null
                  ? "border-white/5 opacity-30 scale-95 grayscale"
                  : "border-white/10 hover:border-game-vanhelsing-blood/50 hover:shadow-[0_0_40px_rgba(154,27,31,0.15)] hover:-translate-y-2 cursor-pointer"
            }`}
          onClick={() => !isLoading && onSelectRole(FACTION.VAN_HELSING)}
        >
          <div className="h-24 flex items-end mb-10">
            <div
              className={`w-px transition-all duration-700 ease-out group-hover:h-24 ${selectedRole === FACTION.VAN_HELSING ? "h-24 bg-game-vanhelsing-blood shadow-[0_0_20px_rgba(154,27,31,1)]" : "h-12 bg-game-vanhelsing-blood/40"}`}
            />
          </div>
          <h4 className="text-3xl md:text-4xl font-black text-game-bone-white uppercase tracking-tight mb-6 font-['Playfair_Display'] group-hover:text-game-vanhelsing-blood transition-colors">
            Vanhelsing
          </h4>
          <p className="text-game-bone-white/50 text-[11px] text-center uppercase tracking-[0.2em] leading-loose mb-12 flex-grow max-w-[280px]">
            Nhiệm vụ: Tiêu diệt Lãnh chúa Dracula trước khi kết thúc 5 vòng đấu.
          </p>
          <Button
            variant="vanhelsing"
            size="lg"
            className={`w-full transition-all duration-500 font-['Playfair_Display'] font-bold tracking-[0.2em] ${selectedRole === FACTION.VAN_HELSING ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            isLoading={isLoading && selectedRole === FACTION.VAN_HELSING}
            disabled={isLoading || selectedRole !== null}
          >
            {selectedRole === FACTION.VAN_HELSING
              ? "Đã Khóa Lựa Chọn"
              : "Trở Thành Thợ Săn"}
          </Button>
        </div>
      </div>

      <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-12 font-bold animate-pulse">
        Định mệnh chỉ gọi tên một người
      </p>
    </div>
  );
};

export default RoleSelectionPhase;
