import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// Đã tắt SignalR
// import signalrService from "../../services/signalrService";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../constants/routes";
import GameBoard from "../../components/game/GameBoard"; // Import component GameBoard đã thiết kế

const GameRoom = () => {
  const { roomCode } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null); // FactionType (0: Dracula, 1: VanHelsing)
  const [isLoading, setIsLoading] = useState(false);

  // Enum mapping từ BE (0: Dracula, 1: VanHelsing)
  const FACTION = { DRACULA: 0, VAN_HELSING: 1 };

  // GIẢ LẬP LUỒNG GAME THAY CHO SIGNALR
  useEffect(() => {
    // 1. Khi mới vào phòng -> Trạng thái Waiting (Chờ đối thủ)
    setGameState({
      status: 0, // RoomStatus.Waiting
      players: [{ userId: user?.id || "me", faction: null }],
    });

    // 2. Giả lập sau 3 giây có đối thủ Join -> Chuyển sang bước Chọn Phe
    const opponentJoinTimer = setTimeout(() => {
      setGameState({
        status: 1, // RoomStatus.Playing (Bắt đầu bước chuẩn bị)
        roomCode: roomCode,
        roundNumber: 1,
        players: [
          { userId: user?.id || "me", faction: null },
          { userId: "opponent-999", faction: null },
        ],
      });
    }, 3000);

    return () => clearTimeout(opponentJoinTimer);
  }, [roomCode, user]);

  const handleSelectRole = (faction) => {
    setSelectedRole(faction);
    setError("");
    setIsLoading(true);

    // Giả lập sau 2 giây (Chờ API và chờ đối thủ chọn) -> Vào game thực sự
    setTimeout(() => {
      setIsLoading(false);
      setGameState((prevState) => ({
        ...prevState,
        players: [
          {
            userId: user?.id || "me",
            faction: faction,
            health: faction === FACTION.DRACULA ? 12 : 0,
          },
          {
            userId: "opponent-999",
            // Cấp phe ngược lại cho đối thủ
            faction:
              faction === FACTION.DRACULA
                ? FACTION.VAN_HELSING
                : FACTION.DRACULA,
            health: faction === FACTION.DRACULA ? 0 : 12,
          },
        ],
      }));
    }, 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-game-dark-teal flex flex-col items-center justify-center p-4 text-game-bone-white">
        <h1 className="text-4xl font-black text-game-vanhelsing-blood mb-4 shadow-text-lg">
          Lời Nguyền Lỗi
        </h1>
        <p className="text-center italic bg-game-vanhelsing-blood/20 p-4 border border-game-vanhelsing-blood rounded-sm mb-6">
          {error}
        </p>
        <Button variant="cold" onClick={() => navigate(ROUTES.HOME)}>
          Quay lại Sảnh
        </Button>
      </div>
    );
  }

  // Chờ load state
  if (!gameState) {
    return (
      <div className="min-h-screen bg-game-dark-teal flex items-center justify-center text-game-bone-white">
        Đang triệu hồi state trận đấu...
      </div>
    );
  }

  // -----------------------------------------------------------
  // RENDER dựa trên trạng thái game (gameState.status)
  // -----------------------------------------------------------

  const isDracula =
    gameState.players.find((p) => p.userId === (user?.id || "me"))?.faction ===
    FACTION.DRACULA;
  const isWaiting = gameState.status === 0; // RoomStatus.Waiting
  const isPlaying = gameState.status === 1; // RoomStatus.Playing

  // Logic chia nhỏ của Playing: Đang chọn Role hay đang chơi thực tế?
  const allPlayersSelectedRole =
    gameState.players.length === 2 &&
    gameState.players.every((p) => p.faction !== null);
  const isSelectingRole = isPlaying && !allPlayersSelectedRole;
  const isActualPlaying = isPlaying && allPlayersSelectedRole;

  return (
    <div className="min-h-screen bg-game-dark-teal text-game-bone-white relative overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-game-vanhelsing-blood rounded-full blur-[150px] opacity-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-game-dracula-orange rounded-full blur-[150px] opacity-10"></div>

      <header className="p-5 border-b border-game-bone-white/10 relative z-10 flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-4">
          <Button
            variant="cold"
            size="sm"
            onClick={() => navigate(ROUTES.HOME)}
          >
            {"<"} Thoát
          </Button>
          <h2 className="text-2xl font-black text-game-bone-white uppercase tracking-tight shadow-text-md">
            Hiệp Ước:{" "}
            <span className="text-game-bone-white tracking-[0.2em] font-mono">
              {roomCode}
            </span>
          </h2>
        </div>
        <div className="bg-black/30 p-2 px-4 rounded-sm border border-game-bone-white/10 text-xs uppercase tracking-widest text-game-bone-white/70">
          {isWaiting && "Đang chờ kẻ thách thức..."}
          {isSelectingRole && "Nghi lễ chọn phe..."}
          {isActualPlaying &&
            `Vòng ${gameState.roundNumber} - Phe ${isDracula ? "Dracula" : "Van Helsing"}`}
        </div>
      </header>

      <main className="flex-grow p-6 md:p-10 relative z-10">
        <div className="max-w-7xl mx-auto h-full">
          {/* GIAI ĐOẠN 1: CHỜ NGƯỜI CHƠI (Waiting) */}
          {isWaiting && (
            <div className="flex flex-col items-center justify-center h-full text-center bg-black/30 p-10 rounded-sm border border-game-bone-white/10 backdrop-blur-sm shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              <div className="animate-pulse w-24 h-24 rounded-full bg-game-bone-white/5 border-4 border-dashed border-game-bone-white/20 flex items-center justify-center mb-10">
                <svg
                  className="w-12 h-12 text-game-bone-white/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-4xl font-extrabold text-game-bone-white uppercase mb-6 shadow-text-lg">
                Đang Chờ Kẻ Phản Bội
              </h3>
              <p className="text-game-bone-white/70 uppercase tracking-widest max-w-md mb-8 lead">
                Hãy gửi mật mã này cho đối thủ của bạn để bắt đầu nghi lễ chiến
                tranh:
              </p>
              <div className="bg-black/50 p-6 px-10 rounded-sm border border-game-bone-white/20 shadow-inner mb-12">
                <span className="text-6xl font-black text-game-dracula-orange tracking-[0.3em] font-mono shadow-[0_0_20px_rgba(225,85,37,0.3)]">
                  {roomCode}
                </span>
              </div>
              <p className="text-xs text-game-bone-white/50 italic">
                * Phép thử: Tự động giả lập đối thủ tham gia sau 3 giây...
              </p>
            </div>
          )}

          {/* GIAI ĐOẠN 2: CHỌN PHE (Selecting Role) */}
          {isSelectingRole && (
            <div className="flex flex-col items-center h-full bg-black/30 p-10 rounded-sm border border-game-bone-white/10 backdrop-blur-sm shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              <header className="text-center mb-12 flex-shrink-0">
                <h3 className="text-4xl font-extrabold text-game-bone-white uppercase mb-4 shadow-text-lg">
                  Chọn Số Phận
                </h3>
                <p className="text-game-bone-white/70 uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
                  Nghi lễ bắt đầu. Bạn sẽ lãnh đạo quân đoàn Đêm tối hay trở
                  thành Thợ săn cuối cùng?
                </p>
                <div className="w-40 h-px bg-gradient-to-r from-transparent via-game-bone-white/30 to-transparent mx-auto mt-6"></div>
              </header>

              <div className="grid md:grid-cols-2 gap-10 w-full flex-grow items-center">
                {/* Option 1: Dracula */}
                <div
                  className={`bg-black/30 p-10 rounded-sm border transition-all duration-300 flex flex-col items-center h-full ${selectedRole === FACTION.DRACULA ? "border-game-dracula-orange shadow-[0_0_30px_rgba(225,85,37,0.4)]" : "border-game-bone-white/10 hover:border-game-dracula-orange/50 hover:shadow-[0_0_30px_rgba(225,85,37,0.2)]"}`}
                >
                  <div
                    className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-8 shadow-xl transition-all ${selectedRole === FACTION.DRACULA ? "bg-game-dracula-orange/20 border-game-dracula-orange shadow-[0_0_20px_rgba(225,85,37,0.3)]" : "bg-black/40 border-game-dracula-orange/30"}`}
                  >
                    <span className="text-6xl">🧛‍♂️</span>
                  </div>
                  <h4 className="text-3xl font-black text-game-dracula-orange uppercase tracking-tight mb-4 shadow-text-md">
                    Lãnh chúa Dracula
                  </h4>
                  <p className="text-game-bone-white/70 text-sm text-center uppercase tracking-widest leading-relaxed mb-10 flex-grow">
                    Sở hữu 12 HP. Nhiệm vụ: Lan truyền Ma cà rồng ra ít nhất 1
                    khu vực hoặc giết chết kẻ đi săn. Quyền năng của đêm nằm
                    trong tay bạn.
                  </p>
                  <Button
                    variant="dracula"
                    size="lg"
                    className="w-full mt-auto"
                    onClick={() => handleSelectRole(FACTION.DRACULA)}
                    isLoading={isLoading && selectedRole === FACTION.DRACULA}
                    disabled={isLoading}
                  >
                    {selectedRole === FACTION.DRACULA
                      ? "Đã Chọn Phe Đêm"
                      : "Lãnh đạo Quân đoàn Đêm"}
                  </Button>
                </div>

                {/* Option 2: Van Helsing */}
                <div
                  className={`bg-black/30 p-10 rounded-sm border transition-all duration-300 flex flex-col items-center h-full ${selectedRole === FACTION.VAN_HELSING ? "border-game-vanhelsing-blood shadow-[0_0_30px_rgba(154,27,31,0.4)]" : "border-game-bone-white/10 hover:border-game-vanhelsing-blood/50 hover:shadow-[0_0_30px_rgba(154,27,31,0.2)]"}`}
                >
                  <div
                    className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-8 shadow-xl transition-all ${selectedRole === FACTION.VAN_HELSING ? "bg-game-vanhelsing-blood/20 border-game-vanhelsing-blood shadow-[0_0_20px_rgba(154,27,31,0.3)]" : "bg-black/40 border-game-vanhelsing-blood/30"}`}
                  >
                    <span className="text-6xl">🤠</span>
                  </div>
                  <h4 className="text-3xl font-black text-game-vanhelsing-blood uppercase tracking-tight mb-4 shadow-text-md">
                    Giáo sư Van Helsing
                  </h4>
                  <p className="text-game-bone-white/70 text-sm text-center uppercase tracking-widest leading-relaxed mb-10 flex-grow">
                    Nhiệm vụ: Tiêu diệt Lãnh chúa Dracula (trừ hết 12 HP) trước
                    khi kết thúc 5 vòng đấu hoặc trước khi Ma cà rồng chiếm
                    đóng.
                  </p>
                  <Button
                    variant="vanhelsing"
                    size="lg"
                    className="w-full mt-auto"
                    onClick={() => handleSelectRole(FACTION.VAN_HELSING)}
                    isLoading={
                      isLoading && selectedRole === FACTION.VAN_HELSING
                    }
                    disabled={isLoading}
                  >
                    {selectedRole === FACTION.VAN_HELSING
                      ? "Đã Chọn Phe Săn"
                      : "Trở thành Thợ săn Cuối cùng"}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-game-bone-white/40 italic mt-10 flex-shrink-0">
                * Nếu cả hai chọn cùng phe, nghi lễ sẽ{" "}
                <span className="font-bold text-game-bone-white/60">
                  random
                </span>{" "}
                số phận.
              </p>
            </div>
          )}

          {/* GIAI ĐOẠN 3: ĐANG CHƠI (Actual Playing) */}
          {/* Bây giờ nó sẽ gọi thẳng vào GameBoard bằng Mock Data của GameBoard */}
          {isActualPlaying && <GameBoard />}
        </div>
      </main>
    </div>
  );
};

export default GameRoom;
