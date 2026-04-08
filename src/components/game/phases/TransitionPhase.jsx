// src/components/game/phases/TransitionPhase.jsx
import React from "react";

const TransitionPhase = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden pointer-events-none">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_10%,_rgba(0,0,0,0.9)_100%)] z-10" />
      <div className="absolute -left-1/4 -top-1/4 w-[50vw] h-[50vw] bg-game-vanhelsing-blood rounded-full blur-[150px] opacity-20 animate-[pulse_3s_ease-in-out_infinite]" />
      <div className="absolute -right-1/4 -bottom-1/4 w-[50vw] h-[50vw] bg-game-dracula-orange rounded-full blur-[150px] opacity-20 animate-[pulse_3s_ease-in-out_infinite_0.5s]" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center animate-in zoom-in-95 duration-1000">
        <div className="flex items-center gap-8 mb-12">
          <div className="text-right">
            <h3 className="text-4xl md:text-6xl font-black text-game-dracula-orange uppercase tracking-widest font-['Playfair_Display'] drop-shadow-[0_0_30px_rgba(225,85,37,0.8)]">
              Dracula
            </h3>
          </div>
          <div className="text-5xl font-black italic text-white/50 font-['Playfair_Display']">
            VS
          </div>
          <div className="text-left">
            <h3 className="text-4xl md:text-6xl font-black text-game-vanhelsing-blood uppercase tracking-widest font-['Playfair_Display'] drop-shadow-[0_0_30px_rgba(154,27,31,0.8)]">
              Van Helsing
            </h3>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <p className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-bold animate-pulse">
            Đang thiết lập bàn cờ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransitionPhase;
