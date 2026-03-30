// src/components/game/MapTokens.jsx

import React from "react";
import { districts } from "../../components/game/bonus/mapConfig";

const MapTokens = ({ zones }) => {
  const getTokenPosition = (district, index) => {
    if (!district?.slots?.length) return { x: 0.5, y: 0.5 };
    return district.slots[index] || district.slots[district.slots.length - 1];
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {zones.map((zone) => {
        const district = districts.find((d) => d.id === zone.zoneIndex);
        if (!district || !zone.tokens) return null;

        return zone.tokens.map((token, i) => {
          const pos = getTokenPosition(district, i);

          // Xử lý logic nối chuỗi đường dẫn ảnh dựa theo trạng thái
          const imagePath =
            token.status === "human"
              ? `${import.meta.env.BASE_URL}images/human/${token.id}.png`
              : `${import.meta.env.BASE_URL}images/vampire/${token.id + 20}.png`;

          return (
            <div
              key={`${zone.zoneIndex}-${i}-${token.id}`}
              className="absolute w-[15%] aspect-square z-10" // ĐÃ TĂNG KÍCH THƯỚC LÊN 10%
              style={{
                left: `${pos.x * 100}%`,
                top: `${pos.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={imagePath}
                alt={`Token ${token.id}`}
                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                onError={(e) => {
                  e.target.style.display = "none"; // Ẩn ảnh nếu load lỗi
                }}
              />
            </div>
          );
        });
      })}
    </div>
  );
};

export default MapTokens;
