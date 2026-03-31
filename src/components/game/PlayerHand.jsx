import React from "react";
import Card from "./Card";
import PlayerStatusWidget from "./PlayerStatusWidget";

const smoothTransition =
  "transition-[transform,opacity,filter,box-shadow] duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu";

const PlayerHand = ({ player, type, hoveredDistrict, setHoveredDistrict }) => {
  const isSelf = type === "self";
  const groupClass = isSelf ? "group/player" : "group/opponent";

  return (
    <div
      className={`relative w-full flex justify-between items-center ${groupClass}`}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 right-[100%] mr-6 xl:mr-10 z-20 ${smoothTransition}`}
      >
        <PlayerStatusWidget player={player} type={type} />
      </div>

      {player.hand.map((card, i) => {
        const districtId = i + 1;
        const isHovered = hoveredDistrict === districtId;
        const isOthersHovered =
          hoveredDistrict !== null && hoveredDistrict !== districtId;

        // Tùy chỉnh hiệu ứng hover/vị trí tùy thuộc vào việc đây là tay bài của mình hay đối thủ
        const hoverEffects = isSelf
          ? isHovered
            ? "scale-110 -translate-y-6 z-20 drop-shadow-[0_0_30px_rgba(225,85,37,0.5)]"
            : "z-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
          : isHovered
            ? "scale-110 translate-y-4 z-20 drop-shadow-[0_15px_30px_rgba(0,0,0,1)]"
            : "z-0 drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]";

        const originClass = isSelf
          ? "origin-bottom cursor-pointer"
          : "origin-top";

        return (
          <div
            key={i}
            className={`w-28 xl:w-36 aspect-[2/3] shrink-0 ${originClass} ${smoothTransition}
              ${isOthersHovered ? `opacity-${isSelf ? "40" : "30"} blur-[${isSelf ? "1px" : "2px"}] scale-95` : "opacity-100"} 
              ${hoverEffects} 
            `}
            onMouseEnter={() => setHoveredDistrict(districtId)}
            onMouseLeave={() => setHoveredDistrict(null)}
          >
            <Card
              cardData={card}
              isHidden={!isSelf && !card.isRevealed}
              className={`w-full h-full ${!isSelf ? "rotate-180" : ""}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PlayerHand;
