// src/components/game/GameBoard.jsx

import React, { useState } from "react";
import Card from "./Card";

import boardBg from "../../assets/images/board-bg.png";
import bloodToken from "../../assets/images/blood.svg";
import coffinToken from "../../assets/images/coffin.svg";
import candleToken from "../../assets/images/candle.svg";
import crossToken from "../../assets/images/cross.svg";

import { districts } from "../../components/game/bonus/mapConfig";

const PlayerStatusWidget = ({ player, type }) => {
  const isSelf = type === "self";
  const usernameColor = isSelf ? "text-white" : "text-white/90";
  const labelColor = isSelf
    ? "text-game-dracula-orange"
    : "text-game-vanhelsing-blood";
  const hpColor = isSelf ? "text-game-dracula-orange" : "text-white";
  const hpShadow = isSelf
    ? "drop-shadow-[0_0_15px_rgba(225,85,37,0.5)]"
    : "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]";

  const displayHealth = Math.max(0, player.health);

  return (
    <div className="flex flex-col items-start gap-1.5 p-3 xl:p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg select-none min-w-[140px] xl:min-w-[160px]">
      <div className="flex items-center gap-2 xl:gap-3">
        <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-gray-700 border-2 border-white/20 shrink-0" />
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
        className={`text-2xl xl:text-3xl font-black ${hpColor} ${hpShadow} w-full text-center mt-1`}
      >
        {displayHealth} <span className="text-xs xl:text-sm font-bold">HP</span>
      </div>
    </div>
  );
};

const GameBoard = () => {
  const mockGameState = {
    roundNumber: 1,
    colorRanking: [0, 1, 2, 3],
    zones: [
      { zoneIndex: 1, humanTokens: 4, vampireTokens: 0 },
      { zoneIndex: 2, humanTokens: 3, vampireTokens: 1 },
      { zoneIndex: 3, humanTokens: 4, vampireTokens: 0 },
      { zoneIndex: 4, humanTokens: 2, vampireTokens: 2 },
      { zoneIndex: 5, humanTokens: 4, vampireTokens: 0 },
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
  const getTokenPosition = (district, index) => {
    if (!district?.slots?.length) return { x: 0.5, y: 0.5 };
    return district.slots[index] || district.slots[district.slots.length - 1];
  };

  const renderColorRanking = () => {
    const tokenImages = {
      0: bloodToken,
      1: coffinToken,
      2: candleToken,
      3: crossToken,
    };
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-6 px-3 xl:py-8 xl:px-4 bg-black/40 backdrop-blur-md rounded-full border border-white/5 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        {ranking.map((colorKey, index) => (
          <React.Fragment key={colorKey}>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              className={`w-14 h-14 xl:w-16 xl:h-16 rounded-full overflow-hidden border border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.8)] transition-transform cursor-grab active:cursor-grabbing flex items-center justify-center p-2.5 ${draggedItemIndex === index ? "opacity-50 scale-95 border-game-dracula-orange border-2" : "hover:scale-110 bg-white/5"}`}
            >
              <img
                src={tokenImages[colorKey]}
                alt=""
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>
            {index < 3 && (
              <div className="text-white/30 shrink-0">
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 24 16"
                  className="w-5 h-3 xl:w-6 xl:h-4"
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
    <div className="fixed inset-0 pt-24 pb-8 w-full h-full bg-game-dark-teal flex items-center justify-center font-['Inter'] px-8 select-none overflow-y-auto box-border">
      <div className="w-full max-w-[1600px] flex flex-row items-center justify-center gap-8 xl:gap-12 h-full max-h-[900px]">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center justify-center gap-4 xl:gap-6 flex-1 max-w-[900px]">
          {/* OPPONENT ROW */}
          <div className="relative w-full flex justify-between items-center">
            <div className="absolute top-1/2 -translate-y-1/2 right-[100%] mr-6 xl:mr-10 z-20">
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
                  className={`w-28 xl:w-36 aspect-[2/3] shrink-0 transition-all duration-300 ease-in-out ${isOthersHovered ? "opacity-50 brightness-75 scale-95" : ""} ${isHovered ? "scale-105 z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "z-0"} `}
                  onMouseEnter={() => setHoveredDistrict(districtId)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  <Card isHidden className="rotate-180 w-full h-full" />
                </div>
              );
            })}
          </div>

          {/* BOARD CONTAINER */}
          <div className="w-full relative shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden border border-white/5 bg-black">
            <div
              style={{ aspectRatio: "1536 / 1024" }}
              className="w-full relative"
            >
              <img
                src={boardBg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              <div className="absolute inset-0 z-10 pointer-events-none">
                {mockGameState.zones.map((zone) => {
                  const district = districts.find(
                    (d) => d.id === zone.zoneIndex,
                  );
                  if (!district) return null;
                  const humans = Array(zone.humanTokens).fill("human");
                  const vampires = Array(zone.vampireTokens).fill("vampire");
                  const tokens = [...humans, ...vampires];
                  return tokens.map((type, i) => {
                    const pos = getTokenPosition(district, i);
                    return (
                      <div
                        key={`${zone.zoneIndex}-${i}`}
                        // Tăng w-[4.5%] lên w-[6.5%] để token to hơn
                        className="absolute w-[6.5%] aspect-square"
                        style={{
                          left: `${pos.x * 100}%`,
                          top: `${pos.y * 100}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full border-[3px] shadow-lg ${type === "human" ? "bg-[#d2c4b3] border-white" : "bg-[#9a1b1f] border-[#e15525] shadow-[0_0_15px_rgba(225,85,37,0.9)]"}`}
                        />
                      </div>
                    );
                  });
                })}
              </div>
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
                      className="pointer-events-auto cursor-pointer transition-all duration-300 ease-in-out"
                      style={{
                        fill: isOthersHovered
                          ? "rgba(0, 0, 0, 0.6)"
                          : isHovered
                            ? "rgba(255, 255, 255, 0.1)"
                            : "transparent",
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
          <div className="relative w-full flex justify-between items-center">
            <div className="absolute top-1/2 -translate-y-1/2 right-[100%] mr-6 xl:mr-10 z-20">
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
                  className={`w-28 xl:w-36 aspect-[2/3] shrink-0 transition-all duration-300 ease-in-out cursor-pointer ${isOthersHovered ? "opacity-50 brightness-75 scale-95" : ""} ${isHovered ? "scale-105 z-10 drop-shadow-[0_0_20px_rgba(225,85,37,0.5)]" : "z-0"} `}
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
