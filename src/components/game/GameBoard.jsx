// src/components/game/GameBoard.jsx

import React, { useState } from "react";
import Card from "./Card";
import MapTokens from "./MapTokens";

import boardBg from "../../assets/images/board-bg.png";
import bloodToken from "../../assets/images/blood.svg";
import coffinToken from "../../assets/images/coffin.svg";
import candleToken from "../../assets/images/candle.svg";
import crossToken from "../../assets/images/cross.svg";

import { districts } from "../../components/game/bonus/mapConfig";

const smoothTransition =
  "transition-[transform,opacity,filter,box-shadow] duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu";

const PlayerStatusWidget = ({ player, type }) => {
  const isSelf = type === "self";
  const usernameColor = isSelf ? "text-white" : "text-white/90";
  const labelColor = isSelf
    ? "text-game-dracula-orange"
    : "text-game-vanhelsing-blood";
  const hpColor = isSelf ? "text-game-dracula-orange" : "text-white/90";
  const hpShadow = isSelf
    ? "drop-shadow-[0_0_10px_rgba(225,85,37,0.6)]"
    : "drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]";

  const displayHealth = Math.max(0, player.health);

  return (
    <div
      className={`flex flex-col items-start gap-1.5 p-3 xl:p-4 bg-[#0d1316]/90 backdrop-blur-md rounded-2xl border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.8)] select-none min-w-[140px] xl:min-w-[160px] ${smoothTransition} hover:scale-105 hover:border-white/10`}
    >
      <div className="flex items-center gap-2 xl:gap-3">
        <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-[#1c2226] border border-white/10 shrink-0 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
        </div>
        <div>
          <span
            className={`text-[9px] xl:text-[10px] uppercase tracking-[0.2em] font-bold ${labelColor} drop-shadow-md block`}
          >
            {isSelf ? "Bạn" : "Kẻ Thù"}
          </span>
          <div
            className={`text-base xl:text-lg font-medium ${usernameColor} leading-tight`}
          >
            {player.username}
          </div>
        </div>
      </div>
      <div
        className={`text-2xl xl:text-3xl font-black ${hpColor} ${hpShadow} w-full text-center mt-1 transition-all duration-300`}
      >
        {displayHealth}{" "}
        <span className="text-xs xl:text-sm font-bold opacity-80">HP</span>
      </div>
    </div>
  );
};

const GameBoard = () => {
  const mockGameState = {
    roundNumber: 1,
    colorRanking: [0, 1, 2, 3],
    zones: [
      {
        zoneIndex: 1,
        tokens: [
          { id: 1, status: "human" },
          { id: 2, status: "vampire" },
          { id: 3, status: "human" },
          { id: 4, status: "vampire" },
        ],
      },
      {
        zoneIndex: 2,
        tokens: [
          { id: 5, status: "human" },
          { id: 6, status: "human" },
          { id: 7, status: "human" },
          { id: 8, status: "human" },
        ],
      },
      {
        zoneIndex: 3,
        tokens: [
          { id: 9, status: "human" },
          { id: 10, status: "vampire" },
          { id: 11, status: "human" },
          { id: 12, status: "human" },
        ],
      },
      {
        zoneIndex: 4,
        tokens: [
          { id: 13, status: "human" },
          { id: 14, status: "human" },
          { id: 15, status: "human" },
          { id: 16, status: "human" },
        ],
      },
      {
        zoneIndex: 5,
        tokens: [
          { id: 17, status: "human" },
          { id: 18, status: "human" },
          { id: 19, status: "human" },
          { id: 20, status: "human" },
        ],
      },
    ],
    players: [
      {
        userId: "user-1",
        username: "Lãnh Chúa",
        faction: 0,
        health: 12,
        hand: [
          { cardId: 1, color: 0, value: 5, isRevealed: false },
          { cardId: 2, color: 1, value: 2, isRevealed: false },
          { cardId: 3, color: 2, value: 8, isRevealed: false },
          { cardId: 4, color: 3, value: 1, isRevealed: false },
          { cardId: 5, color: 0, value: 7, isRevealed: false },
        ],
      },
      {
        userId: "user-2",
        username: "Giáo Sư",
        faction: 1,
        health: 12,
        hand: [
          { cardId: 6, isRevealed: false },
          { cardId: 7, isRevealed: false },
          { cardId: 8, isRevealed: false },
          { cardId: 9, isRevealed: false },
          { cardId: 10, isRevealed: false },
        ],
      },
    ],
  };

  const myPlayer = mockGameState.players[0];
  const opponent = mockGameState.players[1];

  const [ranking, setRanking] = useState(mockGameState.colorRanking);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragEnter = (e, targetIndex) => {
    if (draggedItemIndex === null) return;
    if (draggedItemIndex !== targetIndex) {
      setRanking((prev) => {
        const arr = [...prev];
        const item = arr[draggedItemIndex];
        arr.splice(draggedItemIndex, 1);
        arr.splice(targetIndex, 0, item);
        setDraggedItemIndex(targetIndex);
        return arr;
      });
    }
  };
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };
  const handleDragOver = (e) => e.preventDefault();

  const renderColorRanking = () => {
    const tokenImages = {
      0: bloodToken,
      1: coffinToken,
      2: candleToken,
      3: crossToken,
    };
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
                alt=""
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

  return (
    <div className="fixed inset-0 pt-24 pb-8 w-full h-full bg-[#0a0f12] flex items-center justify-center font-['Inter'] px-8 select-none overflow-y-auto box-border perspective-1000">
      <div className="w-full max-w-[1600px] flex flex-row items-center justify-center gap-8 xl:gap-12 h-full max-h-[900px]">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center justify-center gap-4 xl:gap-8 flex-1 max-w-[900px]">
          {/* OPPONENT ROW */}
          <div className="relative w-full flex justify-between items-center group/opponent">
            <div
              className={`absolute top-1/2 -translate-y-1/2 right-[100%] mr-6 xl:mr-10 z-20 ${smoothTransition}`}
            >
              <PlayerStatusWidget player={opponent} type="opponent" />
            </div>

            {opponent.hand.map((card, i) => {
              const districtId = i + 1;
              const isHovered = hoveredDistrict === districtId;
              const isOthersHovered =
                hoveredDistrict !== null && hoveredDistrict !== districtId;

              return (
                <div
                  key={i}
                  className={`w-28 xl:w-36 aspect-[2/3] shrink-0 ${smoothTransition}
                    ${isOthersHovered ? "opacity-30 blur-[2px] scale-95" : "opacity-100"} 
                    ${isHovered ? "scale-110 translate-y-4 z-20 drop-shadow-[0_15px_30px_rgba(0,0,0,1)]" : "z-0 drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"} 
                  `}
                  onMouseEnter={() => setHoveredDistrict(districtId)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  <Card isHidden className="rotate-180 w-full h-full" />
                </div>
              );
            })}
          </div>

          {/* BOARD CONTAINER */}
          <div
            className={`w-full relative shadow-[0_20px_80px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden border border-[#232a30] bg-[#05080a] ${smoothTransition}`}
          >
            <div
              style={{ aspectRatio: "1536 / 1024" }}
              className="w-full relative"
            >
              <img
                src={boardBg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              <MapTokens zones={mockGameState.zones} />

              <svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 1536 1024"
                preserveAspectRatio="none"
              >
                {districts.map((district) => {
                  const isHovered = hoveredDistrict === district.id;
                  const isOthersHovered =
                    hoveredDistrict !== null && hoveredDistrict !== district.id;
                  return (
                    <polygon
                      key={district.id}
                      points={district.rawPolygon
                        .map((p) => p.join(","))
                        .join(" ")}
                      className="pointer-events-auto cursor-pointer transition-colors duration-500 ease-in-out"
                      style={{
                        fill: isOthersHovered
                          ? "rgba(0, 0, 0, 0.75)"
                          : isHovered
                            ? "rgba(255, 255, 255, 0.15)"
                            : "transparent",
                        stroke: "transparent",
                        strokeWidth: "0",
                      }}
                      onMouseEnter={() => setHoveredDistrict(district.id)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* MY PLAYER ROW */}
          <div className="relative w-full flex justify-between items-center group/player">
            <div
              className={`absolute top-1/2 -translate-y-1/2 right-[100%] mr-6 xl:mr-10 z-20 ${smoothTransition}`}
            >
              <PlayerStatusWidget player={myPlayer} type="self" />
            </div>

            {myPlayer.hand.map((card, i) => {
              const districtId = i + 1;
              const isHovered = hoveredDistrict === districtId;
              const isOthersHovered =
                hoveredDistrict !== null && hoveredDistrict !== districtId;

              return (
                <div
                  key={i}
                  className={`w-28 xl:w-36 aspect-[2/3] shrink-0 cursor-pointer origin-bottom ${smoothTransition}
                    ${isOthersHovered ? "opacity-40 blur-[1px] scale-95" : "opacity-100"} 
                    ${isHovered ? "scale-110 -translate-y-6 z-20 drop-shadow-[0_0_30px_rgba(225,85,37,0.5)]" : "z-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"} 
                  `}
                  onMouseEnter={() => setHoveredDistrict(districtId)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  <Card cardData={card} className="w-full h-full" />
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: COLOR RANKING */}
        <div className="shrink-0 flex flex-col justify-center">
          {renderColorRanking()}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
