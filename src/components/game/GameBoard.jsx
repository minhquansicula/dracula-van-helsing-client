import React from "react";
import Card from "./Card";
import BoardZone from "./BoardZone";

const GameBoard = () => {
  // Dữ liệu giả (Mock Data) để code giao diện không cần BE
  const mockGameState = {
    roundNumber: 1,
    currentTurnUserId: "user-1",
    colorRanking: [0, 2, 1, 3], // Red > Green > Purple > Yellow
    zones: [
      { zoneIndex: 1, humanTokens: 4, vampireTokens: 0 },
      { zoneIndex: 2, humanTokens: 3, vampireTokens: 1 },
      { zoneIndex: 3, humanTokens: 4, vampireTokens: 0 },
      { zoneIndex: 4, humanTokens: 2, vampireTokens: 2 },
      { zoneIndex: 5, humanTokens: 4, vampireTokens: 0 },
    ],
    players: [
      {
        userId: "user-1", // Giả sử đây là mình
        username: "MinhQuan (Dracula)",
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
        userId: "user-2", // Đối thủ
        username: "Kẻ Thù (Van Helsing)",
        faction: 1,
        health: 0,
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

  return (
    <div className="flex flex-col h-full justify-between gap-6 p-4">
      {/* KHU VỰC ĐỐI THỦ (Phía trên) */}
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full max-w-4xl mb-4 text-game-bone-white/70">
          <span className="font-bold uppercase tracking-widest">
            {opponent.username}
          </span>
          <span>HP: {opponent.health > 0 ? opponent.health : "∞"}</span>
        </div>
        <div className="flex gap-2 sm:gap-4">
          {opponent.hand.map((card, i) => (
            <Card key={`opp-card-${i}`} isHidden={!card.isRevealed} />
          ))}
        </div>
      </div>

      {/* BÀN CỜ CHÍNH (Ở giữa) */}
      <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-5xl mx-auto w-full">
        {mockGameState.zones.map((zone) => (
          <BoardZone key={`zone-${zone.zoneIndex}`} zone={zone} />
        ))}
      </div>

      {/* KHU VỰC CỦA MÌNH (Phía dưới) */}
      <div className="flex flex-col items-center">
        <div className="flex gap-2 sm:gap-4 mb-4">
          {myPlayer.hand.map((card, i) => (
            <Card
              key={`my-card-${i}`}
              cardData={card}
              isHidden={card.isRevealed}
            />
          ))}
        </div>
        <div className="flex justify-between w-full max-w-4xl text-game-bone-white">
          <span className="font-bold text-game-dracula-orange uppercase tracking-widest">
            {myPlayer.username}
          </span>
          <span className="font-black text-game-vanhelsing-blood">
            HP: {myPlayer.health}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
