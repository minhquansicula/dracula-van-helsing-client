import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Button from "../../components/ui/Button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-game-dark-teal text-game-bone-white relative overflow-hidden flex flex-col items-center justify-center p-4 antialiased font-['Inter']">
      {/* 1. Hiệu ứng nền ma mị (Sương mù ánh sáng rộng) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Hào quang Dracula (Cam bốc lửa) - Rộng và mờ ảo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-full -translate-y-1/2 w-[60vw] h-[60vw] bg-game-dracula-orange rounded-full blur-[250px] opacity-15"></div>
        {/* Hào quang Van Helsing (Đỏ máu) - Rộng và mờ ảo */}
        <div className="absolute top-1/2 left-1/2 transform translate-y-[-50%] w-[60vw] h-[60vw] bg-game-vanhelsing-blood rounded-full blur-[250px] opacity-15"></div>

        {/* Lớp phủ tối nhẹ để tăng độ sâu */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      {/* 2. Nội dung chính (Centralized & Minimalist) */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto mt-[-10vh]">
        {/* Tiêu đề chính: Hiện đại, sạch sẽ, nhưng imposes */}
        <h1 className="text-7xl md:text-9xl font-black text-game-bone-white uppercase tracking-[-0.05em] mb-4 flex items-center gap-x-6">
          <span className="shadow-text-lg">Dracula</span>

          {/* Điểm nhấn ma mị cổ điển duy nhất: font Serif đỏ */}
          <span className="text-6xl md:text-8xl text-game-vanhelsing-blood font-['Playfair_Display'] font-black italic shadow-text-md relative top-[-5px]">
            VS
          </span>

          <span className="shadow-text-lg">Van Helsing</span>
        </h1>

        {/* Câu trích dẫn: Đơn giản, tinh tế, font serif ma mị */}
        <p className="text-xl md:text-2xl text-game-bone-white/60 italic max-w-2xl leading-relaxed mb-20 font-['Playfair_Display'] tracking-wide">
          "Đêm đen buông xuống London. Ai sẽ là kẻ thống trị cuối cùng?"
        </p>

        {/* 3. Nút bấm (Hiện đại & Đơn giản) */}
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
          <Link to={ROUTES.LOBBY} className="w-full sm:w-auto">
            <Button
              variant="dracula"
              size="lg"
              className="w-full sm:w-80 text-lg py-5 font-bold uppercase tracking-widest bg-game-dracula-orange/90 border-game-dracula-orange/30 backdrop-blur-sm transition-all hover:bg-game-dracula-orange hover:shadow-[0_0_30px_rgba(225,85,37,0.5)] active:scale-[0.98]"
            >
              Bắt Đầu Cuộc Săn
            </Button>
          </Link>
          <a
            href="https://boardgamegeek.com/boardgame/380695/dracula-vs-van-helsing"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="vanhelsing"
              size="lg"
              className="w-full sm:w-80 text-lg py-5 font-bold uppercase tracking-widest bg-transparent border-game-bone-white/20 text-game-bone-white backdrop-blur-sm transition-all hover:bg-game-bone-white/5 hover:border-game-bone-white/40 hover:shadow-[0_0_30px_rgba(212,214,198,0.1)] active:scale-[0.98]"
            >
              Xem Luật Chơi
            </Button>
          </a>
        </div>
      </div>

      {/* 4. Footer (Cực kỳ đơn giản) */}
      <footer className="absolute bottom-6 text-game-bone-white/30 text-xs uppercase tracking-[0.2em] font-medium">
        © Phiên bản phi thương mại
      </footer>
    </div>
  );
};

export default LandingPage;
