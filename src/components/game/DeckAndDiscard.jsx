import React from "react";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

const DeckAndDiscard = ({
  drawPileCount,
  topDiscardCard,
  topDeckCardId, // 1. NHẬN PROP LÁ BÀI BỊ LỘ TỪ GAMEBOARD
  onDraw,
  isMyTurn,
  hasDrawnCard,
}) => {
  const canDraw = isMyTurn && !hasDrawnCard;

  return (
    <div className="flex flex-col items-center gap-8 xl:gap-12 bg-[#0d1316]/80 backdrop-blur-md py-8 px-4 xl:py-10 xl:px-6 rounded-full border border-white/5 shadow-[10px_0_40px_rgba(0,0,0,0.9)]">
      {/* KHU VỰC BỘ BÀI (DECK) */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-white/40 text-[10px] xl:text-xs uppercase font-bold tracking-widest flex items-center gap-2">
          Bộ Bài ({drawPileCount})
          {/* 2. HIỆN ICON CON MẮT NẾU BÀI ĐANG BỊ LỘ */}
          {topDeckCardId && (
            <svg
              className="w-4 h-4 text-game-dracula-orange animate-pulse drop-shadow-[0_0_5px_rgba(225,85,37,1)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              title="Đang bị lộ diện do Kỹ năng 2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </div>
        <div className="relative group perspective-1000">
          <div
            className={`w-24 xl:w-32 aspect-[2/3] rounded-lg transition-all duration-400 ease-out transform-gpu
              ${
                canDraw
                  ? "cursor-pointer hover:-translate-y-4 hover:scale-105 shadow-[0_0_30px_rgba(225,85,37,0.5)] border border-game-dracula-orange animate-pulse"
                  : "opacity-80 border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              }
              ${topDeckCardId ? "ring-2 ring-game-dracula-orange shadow-[0_0_20px_rgba(225,85,37,0.6)]" : ""}
            `}
            onClick={canDraw ? onDraw : undefined}
          >
            {drawPileCount > 0 ? (
              // 3. LOGIC LẬT BÀI SỐ 2 TẠI ĐÂY
              topDeckCardId ? (
                <Card
                  cardData={{ cardId: topDeckCardId, isRevealed: true }}
                  isHidden={false}
                  className="w-full h-full"
                />
              ) : (
                <Card isHidden={true} className="w-full h-full" />
              )
            ) : (
              <div className="w-full h-full bg-black/40 flex items-center justify-center rounded-lg">
                <span className="text-white/20 text-xs uppercase font-bold">
                  Hết bài
                </span>
              </div>
            )}
          </div>

          {canDraw && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-game-dracula-orange text-black px-3 py-1 text-[10px] font-bold uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Click để rút bài
            </div>
          )}
        </div>
      </div>

      <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* KHU VỰC MỘ BÀI (DISCARD PILE) */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-white/40 text-[10px] xl:text-xs uppercase font-bold tracking-widest">
          Mộ Bài
        </div>
        <div className="w-24 xl:w-32 aspect-[2/3] rounded-lg border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] bg-black/50 relative flex items-center justify-center transition-all duration-300 overflow-visible perspective-1000">
          <AnimatePresence mode="wait">
            {topDiscardCard ? (
              <motion.div
                key={`discard-${topDiscardCard.cardId}`}
                initial={{
                  x: 600,
                  y: 200,
                  rotateY: 180,
                  rotateZ: 45,
                  scale: 1.5,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  mass: 0.8,
                }}
                className="absolute inset-0 w-full h-full z-50 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] origin-center"
              >
                <Card cardData={topDiscardCard} className="w-full h-full" />
              </motion.div>
            ) : (
              <span className="text-white/10 text-[10px] uppercase font-bold tracking-widest">
                Trống
              </span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DeckAndDiscard;
