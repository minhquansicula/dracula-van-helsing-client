import React, { useState, useEffect } from "react";
import bloodToken from "../../assets/images/blood.svg";
import coffinToken from "../../assets/images/coffin.svg";
import candleToken from "../../assets/images/candle.svg";
import crossToken from "../../assets/images/cross.svg";

const smoothTransition =
  "transition-[transform,opacity,filter,box-shadow] duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu";

const tokenImages = {
  0: bloodToken,
  1: coffinToken,
  2: candleToken,
  3: crossToken,
};

const ColorRankingBoard = ({ initialRanking, onRankingChange }) => {
  const [ranking, setRanking] = useState(initialRanking || [0, 1, 2, 3]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    if (initialRanking) setRanking(initialRanking);
  }, [initialRanking]);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e, targetIndex) => {
    if (draggedItemIndex === null) return;
    if (draggedItemIndex !== targetIndex) {
      const newRanking = [...ranking];
      const item = newRanking[draggedItemIndex];
      newRanking.splice(draggedItemIndex, 1);
      newRanking.splice(targetIndex, 0, item);

      setRanking(newRanking);
      setDraggedItemIndex(targetIndex);
      if (onRankingChange) onRankingChange(newRanking);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6 px-3 xl:py-8 xl:px-4 bg-[#0d1316]/80 backdrop-blur-md rounded-full border border-white/5 shadow-[-10px_0_40px_rgba(0,0,0,0.9)]">
      {ranking.map((colorKey, index) => (
        <React.Fragment key={colorKey}>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            className={`w-20 h-20 xl:w-28 xl:h-28 rounded-full overflow-hidden border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform-gpu cursor-grab active:cursor-grabbing flex items-center justify-center p-2.5 
              ${
                draggedItemIndex === index
                  ? "opacity-60 scale-90 border-game-dracula-orange border-2 shadow-[0_0_20px_rgba(225,85,37,0.5)] bg-black/60 rotate-3"
                  : "border-white/10 hover:scale-110 hover:border-white/30 bg-[#161d22] shadow-[0_8px_20px_rgba(0,0,0,0.8)] hover:shadow-[0_12px_25px_rgba(0,0,0,1)]"
              }`}
          >
            <img
              src={tokenImages[colorKey]}
              alt={`Token ${colorKey}`}
              className={`w-full h-full object-contain pointer-events-none ${smoothTransition} ${draggedItemIndex !== index && "hover:scale-110"}`}
            />
          </div>
          {index < 3 && (
            <div
              className={`text-white/20 shrink-0 transition-opacity duration-300 ${draggedItemIndex !== null ? "opacity-0" : "opacity-100"}`}
            >
              <svg
                width="20"
                height="12"
                viewBox="0 0 24 16"
                className="w-5 h-3 xl:w-6 xl:h-4 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]"
              >
                <polyline
                  points="4,4 12,12 20,4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ColorRankingBoard;
