// src/components/game/GameBoard.jsx
import React, { useState } from "react";
import MapTokens from "./MapTokens";
import ColorRankingBoard from "./ColorRankingBoard";
import PlayerHand from "./PlayerHand";
import DeckAndDiscard from "./DeckAndDiscard";

import boardBg from "../../assets/images/board-bg.png";
import { districts } from "../../components/game/bonus/mapConfig";

const smoothTransition =
  "transition-[transform,opacity,filter,box-shadow] duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu";

const GameBoard = () => {
  const mockGameState = {
    roundNumber: 1,
    colorRanking: [0, 1, 2, 3],
    drawPileCount: 15,
    topDiscardCard: { cardId: 21, color: 0, value: 4, isRevealed: true },
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

  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  const handleDrawCard = () => {
    console.log("Action: Draw a card from deck");
  };

  const handleDiscardClick = () => {
    console.log("Action: Clicked discard pile");
  };

  return (
    <div className="fixed inset-0 pt-24 pb-8 w-full h-full bg-[#0a0f12] flex items-center justify-center font-['Inter'] px-8 select-none overflow-y-auto box-border perspective-1000">
      <div className="w-full max-w-[1600px] flex flex-row items-center justify-center gap-8 xl:gap-12 h-full max-h-[900px]">
        {/* LEFT COLUMN: Deck & Discard */}
        <div className="shrink-0 flex flex-col justify-center gap-8 xl:gap-12">
          <DeckAndDiscard
            drawPileCount={mockGameState.drawPileCount}
            topDiscardCard={mockGameState.topDiscardCard}
            onDraw={handleDrawCard}
            onDiscard={handleDiscardClick}
          />
        </div>

        {/* MIDDLE COLUMN: Players & Board */}
        <div className="flex flex-col items-center justify-center gap-4 xl:gap-8 flex-1 max-w-[900px]">
          {/* OPPONENT ROW */}
          <PlayerHand
            player={opponent}
            type="opponent"
            hoveredDistrict={hoveredDistrict}
            setHoveredDistrict={setHoveredDistrict}
          />

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
                alt="Board Background"
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
          <PlayerHand
            player={myPlayer}
            type="self"
            hoveredDistrict={hoveredDistrict}
            setHoveredDistrict={setHoveredDistrict}
          />
        </div>

        {/* RIGHT COLUMN: Color Ranking */}
        <div className="shrink-0 flex flex-col justify-center gap-8 xl:gap-12">
          <ColorRankingBoard
            initialRanking={mockGameState.colorRanking}
            onRankingChange={(newRanking) => {
              console.log("New Ranking:", newRanking);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
