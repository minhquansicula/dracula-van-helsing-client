// src/components/GlobalPreloader.jsx
import React, { memo } from "react";
import { GAME_ASSETS_TO_PRELOAD } from "../constants/preloadAssets";

// Dùng React.memo để đảm bảo component này CHỈ render đúng 1 lần duy nhất
// trong suốt vòng đời của cả trang web, dù các state khác có thay đổi.
const GlobalPreloader = memo(() => {
  return (
    <div
      style={{
        display: "none",
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Tải và giữ toàn bộ ảnh game trong DOM vĩnh viễn */}
      {GAME_ASSETS_TO_PRELOAD.map((url, index) => (
        <img key={index} src={url} alt="" fetchPriority="low" />
      ))}
    </div>
  );
});

export default GlobalPreloader;
