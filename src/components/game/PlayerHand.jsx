// src/components/game/PlayerHand.jsx
import React from "react";
import Card from "./Card";
import PlayerStatusWidget from "./PlayerStatusWidget";
import { motion, AnimatePresence } from "framer-motion";

const smoothTransition = "transition-all duration-300 ease-out transform-gpu";

const PlayerHand = ({
  player,
  type,
  hoveredDistrict,
  forcedDistrict,
  setHoveredDistrict,
  isMyTurn,
  hasDrawnCard,
  drawnCard,
  onPlayCard,
  isTargeting = false,
  onTargetClick = () => {},
  selectedCards = [],
}) => {
  const isSelf = type === "self";
  const groupClass = isSelf ? "group/player" : "group/opponent";

  return (
    <div
      className={`relative w-full flex justify-between items-center ${groupClass}`}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 right-[100%] mr-8 xl:mr-12 z-20`}
      >
        <PlayerStatusWidget player={player} type={type} />
      </div>

      <div className="flex w-full justify-between items-center gap-2 xl:gap-3">
        {player.hand.map((card, i) => {
          const districtId = i + 1;
          const isFightingNow = forcedDistrict === districtId;
          const isDistrictHoveredFromMap =
            isFightingNow ||
            (!forcedDistrict && hoveredDistrict === districtId);
          const isOthersHoveredFromMap = forcedDistrict
            ? !isFightingNow
            : hoveredDistrict !== null && hoveredDistrict !== districtId;

          const canSwapNormally =
            isSelf &&
            isMyTurn &&
            hasDrawnCard &&
            !isTargeting &&
            !forcedDistrict;
          const isTargetable = isTargeting && !forcedDistrict;
          const isSelected = selectedCards.includes(card.cardId);

          const isLoser = card.isLoser;
          const isWinner = card.isWinner;

          let visualEffects =
            "z-0 drop-shadow-md hover:scale-[1.03] hover:-translate-y-1";

          if (isFightingNow) {
            visualEffects = "scale-105 z-30 drop-shadow-lg";
            if (isWinner) visualEffects += " ring-2 ring-game-dracula-orange";
            if (isLoser) visualEffects += " brightness-50 grayscale opacity-60";
          } else if (isLoser) {
            visualEffects = "brightness-50 grayscale opacity-60";
          } else if (isDistrictHoveredFromMap && !forcedDistrict) {
            visualEffects =
              "scale-105 -translate-y-2 z-30 drop-shadow-lg ring-1 ring-white/30";
          }

          const originClass = isSelf ? "origin-bottom" : "origin-top";
          const cursorClass =
            canSwapNormally || isTargetable
              ? "cursor-pointer"
              : "cursor-default";

          return (
            <div
              key={i}
              className={`w-28 xl:w-40 aspect-[2/3] shrink-0 ${originClass} ${cursorClass} ${smoothTransition}
                ${isOthersHoveredFromMap && !isLoser ? "opacity-60 scale-[0.98]" : "opacity-100"} 
                ${visualEffects} 
                {/* TRẢ LẠI HIỆU ỨNG NHẤP NHÁY Ở ĐÂY NÈ BẠN: */}
                ${canSwapNormally && !isDistrictHoveredFromMap ? "animate-pulse ring-2 ring-game-dracula-orange/60 shadow-[0_0_15px_rgba(225,85,37,0.4)] rounded-md" : ""}
                ${isTargetable && !isSelected ? `ring-2 ${isSelf ? "ring-game-dracula-orange" : "ring-game-vanhelsing-blood"} rounded-md hover:scale-105 animate-pulse shadow-[0_0_15px_rgba(154,27,31,0.5)]` : ""}
                ${isSelected ? "ring-2 ring-game-dracula-orange scale-105 z-30 brightness-110 rounded-md shadow-[0_0_20px_rgba(225,85,37,0.8)]" : ""}
              `}
              onClick={() => {
                if (isTargetable) onTargetClick(card.cardId);
                else if (canSwapNormally) onPlayCard(card.cardId);
              }}
            >
              <Card
                cardData={card}
                isHidden={!isSelf && !card.isRevealed}
                className={`w-full h-full ${!isSelf ? "rotate-180" : ""}`}
              />

              {isTargetable && !isSelected && (
                <div
                  className={`absolute inset-0 hover:bg-black/30 rounded-md z-30 flex items-center justify-center pointer-events-none transition-colors opacity-0 hover:opacity-100 ${!isSelf ? "rotate-180" : ""}`}
                >
                  <span
                    className={`text-white text-xs font-bold uppercase bg-black/60 px-2 py-1 rounded border ${isSelf ? "border-game-dracula-orange text-game-dracula-orange" : "border-game-vanhelsing-blood"}`}
                  >
                    Chọn
                  </span>
                </div>
              )}

              {isSelected && (
                <div
                  className={`absolute inset-0 bg-game-dracula-orange/20 rounded-md z-30 flex items-center justify-center pointer-events-none ${!isSelf ? "rotate-180" : ""}`}
                >
                  <span className="text-white text-xs font-black bg-black/60 px-2 py-1 rounded border border-game-dracula-orange">
                    Đã Chọn
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isSelf && (
        <div className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-8 xl:ml-12 z-20 flex flex-col items-center pr-4">
          <div
            className={`absolute -top-6 whitespace-nowrap text-[9px] xl:text-[11px] uppercase font-bold transition-colors ${hasDrawnCard ? "text-game-dracula-orange" : "text-white/30"}`}
          >
            {hasDrawnCard ? "Lá Bài Rút" : "Slot Trống"}
          </div>

          <div
            className={`w-28 xl:w-40 aspect-[2/3] shrink-0 origin-bottom rounded-md transition-all duration-300 transform-gpu
               ${hasDrawnCard && !isTargeting && !forcedDistrict ? "cursor-pointer border border-game-dracula-orange hover:-translate-y-2 hover:scale-105 z-30" : "border border-white/10 opacity-40 bg-black/10"}
               ${(hasDrawnCard && isTargeting) || forcedDistrict ? "grayscale opacity-50 pointer-events-none" : ""}
             `}
            onClick={() =>
              hasDrawnCard &&
              !isTargeting &&
              !forcedDistrict &&
              onPlayCard(drawnCard.cardId)
            }
          >
            <AnimatePresence mode="wait">
              {hasDrawnCard && drawnCard ? (
                <motion.div
                  key={`drawn-${drawnCard.cardId}`}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full"
                >
                  <Card cardData={drawnCard} className="w-full h-full" />
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerHand;
