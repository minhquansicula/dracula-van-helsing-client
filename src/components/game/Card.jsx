// src/components/game/Card.jsx
// Vấn đề các lá bài cảm giác "không bằng nhau" thường do tỷ lệ hình ảnh gốc chưa chuẩn hoặc khi ép `object-contain` nó tự động tính toán khoảng trắng.
// Nếu bạn muốn tất cả bằng nhau chằn chặn và khít vào khung, hãy dùng `object-cover`.
// Nếu bạn đã thiết kế ảnh chuẩn 1200x1500 (tỉ lệ 4:5), hãy đổi lại thành `object-contain` VÀ phải chắc chắn thẻ bọc ngoài ở GameBoard có `aspect-[4/5]`.
// Hiện tại trong GameBoard của bạn, thẻ bọc ngoài đang là `aspect-[2/3]`, điều này làm khung bài bị méo hoặc thừa khoảng trắng so với ảnh 1200x1500.

import React from "react";

const Card = ({ cardData, isHidden, className = "" }) => {
  const basePath = import.meta.env
    ? import.meta.env.BASE_URL
    : process.env.PUBLIC_URL || "";

  if (isHidden || !cardData) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <img
          src={`${basePath}images/cards/card_back.png`}
          alt="Card Back"
          // Dùng object-cover để lấp đầy thẻ, hoặc object-contain nếu đảm bảo aspect-ratio thẻ cha chuẩn 4/5
          className="absolute inset-0 w-full h-full object-cover scale-[1.17] pointer-events-none block m-0 p-0 drop-shadow-md"
        />
      </div>
    );
  }

  const imagePath = `${basePath}images/cards/${cardData.color}_${cardData.value}.png`;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={imagePath}
        alt={`Card ${cardData.color}-${cardData.value}`}
        // Dùng object-cover để lấp đầy thẻ
        className="absolute inset-0 w-full h-full object-cover scale-[1.175] pointer-events-none block m-0 p-0 drop-shadow-md"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </div>
  );
};

export default Card;
