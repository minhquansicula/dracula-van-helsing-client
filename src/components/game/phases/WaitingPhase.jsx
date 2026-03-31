import React from "react";

const WaitingPhase = ({ roomCode }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center h-full text-center">
      <div className="h-px w-32 bg-game-bone-white/10 relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-game-dracula-orange w-1/2 animate-[pulse_1.5s_infinite_ease-in-out] shadow-[0_0_15px_rgba(225,85,37,0.8)]" />
      </div>

      <h3 className="text-5xl md:text-7xl font-black text-game-bone-white uppercase mb-4 font-['Playfair_Display'] tracking-tighter drop-shadow-2xl">
        Kẻ Thách Thức
      </h3>
      <p className="text-game-bone-white/40 uppercase tracking-[0.4em] max-w-md mb-12 text-xs font-bold">
        Chưa xuất hiện
      </p>

      <div className="group relative bg-black/60 p-8 px-16 border-y border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] mb-12 overflow-hidden transition-all hover:border-game-dracula-orange/30">
        <div className="absolute inset-0 bg-game-dracula-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
        <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-[0.3em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] relative z-10 font-['Playfair_Display'] select-all">
          {roomCode}
        </span>
      </div>
    </div>
  );
};

export default WaitingPhase;
