import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// import signalrService from "../../services/signalrService"; // Đã tạm tắt SignalR
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { ROUTES } from "../../constants/routes";

const Lobby = () => {
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Đã tạm tắt useEffect gọi SignalR
  /*
  useEffect(() => {
    signalrService.startConnection();
    // ...
  }, [navigate]);
  */

  const handleCreateRoom = () => {
    setError("");
    setIsLoading(true);

    // Giả lập thời gian chờ gọi API (1 giây) rồi chuyển trang thẳng vào Room
    setTimeout(() => {
      setIsLoading(false);
      navigate(ROUTES.GAME_ROOM.replace(":roomCode", "DEMO99"));
    }, 1000);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!joinCode) return;
    setError("");
    setIsLoading(true);

    // Giả lập thời gian chờ gọi API (1 giây) rồi chuyển trang thẳng vào Room
    setTimeout(() => {
      setIsLoading(false);
      navigate(ROUTES.GAME_ROOM.replace(":roomCode", joinCode.toUpperCase()));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-game-dark-teal p-6 md:p-10 relative overflow-hidden text-game-bone-white">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-game-dracula-orange rounded-full blur-[150px] opacity-10"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-game-vanhelsing-blood rounded-full blur-[150px] opacity-10"></div>

      <header className="flex items-center justify-between pb-6 border-b border-game-bone-white/10 mb-12 relative z-10">
        <div>
          <h1 className="text-game-dracula-orange text-xs font-black uppercase tracking-[0.3em] shadow-text-sm">
            Dracula vs Van Helsing
          </h1>
          <h2 className="text-3xl font-extrabold text-game-bone-white uppercase tracking-tighter shadow-text-lg">
            Sảnh Chờ
          </h2>
        </div>
        <div className="flex items-center gap-4 bg-black/30 p-2 px-4 rounded-sm border border-game-bone-white/10">
          <span className="text-xs text-game-bone-white/70 uppercase tracking-widest">
            Hiệp sĩ,
          </span>
          <span className="font-black text-game-bone-white shadow-text-sm">
            {user?.username || "Ẩn danh"}
          </span>
          <button
            onClick={logout}
            className="text-xs text-game-vanhelsing-blood hover:text-white uppercase tracking-widest ml-2 hover:shadow-text-xs"
          >
            Thoát
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto relative z-10">
        {error && (
          <div className="bg-game-vanhelsing-blood/20 border border-game-vanhelsing-blood text-game-bone-white px-4 py-3 rounded-sm mb-10 text-center text-sm italic shadow-[0_0_15px_rgba(154,27,31,0.5)] max-w-md mx-auto">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          {/* CỘT 1: TẠO PHÒNG (Theme Dracula) */}
          <div className="bg-black/50 p-10 rounded-sm border border-game-bone-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center backdrop-blur-sm transition-all hover:border-game-dracula-orange/30 hover:shadow-[0_0_50px_rgba(225,85,37,0.2)]">
            <div className="w-20 h-20 rounded-full bg-game-dracula-orange/10 border-2 border-game-dracula-orange flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(225,85,37,0.3)]">
              {/* Icon ngọn lửa/Dracula */}
              <svg
                className="w-10 h-10 text-game-dracula-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14.015V11zm2.015 0L11 14.015V11z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-game-bone-white uppercase tracking-tight mb-4 shadow-text-md">
              Triệu Hồi Đêm Tối
            </h3>
            <p className="text-game-bone-white/70 text-sm mb-10 max-w-xs uppercase tracking-widest leading-relaxed">
              Tạo một hiệp ước chiến tranh mới. Bạn sẽ bắt đầu nghi lễ với tư
              cách là{" "}
              <span className="text-game-dracula-orange font-bold">Chủ tế</span>
              .
            </p>
            <Button
              variant="dracula"
              size="lg"
              className="w-full mt-auto"
              onClick={handleCreateRoom}
              isLoading={isLoading}
            >
              Tạo Hiệp Ước Mới
            </Button>
          </div>

          {/* CỘT 2: GIA NHẬP (Theme Van Helsing) */}
          <form
            onSubmit={handleJoinRoom}
            className="bg-black/50 p-10 rounded-sm border border-game-bone-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center backdrop-blur-sm transition-all hover:border-game-vanhelsing-blood/30 hover:shadow-[0_0_50px_rgba(154,27,31,0.2)]"
          >
            <div className="w-20 h-20 rounded-full bg-game-vanhelsing-blood/10 border-2 border-game-vanhelsing-blood flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(154,27,31,0.3)]">
              {/* Icon Thập tự/Kẻ săn */}
              <svg
                className="w-10 h-10 text-game-vanhelsing-blood"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-game-bone-white uppercase tracking-tight mb-4 shadow-text-md">
              Gia Nhập Cuộc Chiến
            </h3>
            <p className="text-game-bone-white/70 text-sm mb-10 max-w-xs uppercase tracking-widest leading-relaxed">
              Nhập{" "}
              <span className="text-game-vanhelsing-blood font-bold">
                Mật mã Hiệp ước
              </span>{" "}
              để tham gia vào một cuộc săn đã được triệu hồi.
            </p>

            <Input
              placeholder="Ví dụ: DEMTOI"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="w-full mb-6"
              maxLength={10}
              style={{
                textAlign: "center",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            />

            <Button
              type="submit"
              variant="vanhelsing"
              size="lg"
              className="w-full mt-auto"
              isLoading={isLoading}
            >
              Ký Tên Gia Nhập
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Lobby;
