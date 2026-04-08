// src/pages/Game/GameRoom.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../constants/routes";
import useGameStore from "../../store/useGameStore";
import { motion, AnimatePresence } from "framer-motion";

import GameBoard from "../../components/game/GameBoard";
import WaitingPhase from "../../components/game/phases/WaitingPhase";
import RoleSelectionPhase from "../../components/game/phases/RoleSelectionPhase";
import TransitionPhase from "../../components/game/phases/TransitionPhase";
import RulebookModal from "../../components/game/RulebookModal";

const FACTION = { DRACULA: 0, VAN_HELSING: 1 };
const ROOM_STATUS = { WAITING: 0, PLAYING: 1, FINISHED: 2 };

const GameRoom = () => {
  const { roomCode } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // FIX LỖI Ở ĐÂY: Thêm leaveRoom vào danh sách lấy từ store
  const {
    gameState,
    selectRole,
    surrender,
    error,
    resetGame,
    callEndRound,
    leaveRoom,
  } = useGameStore();

  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRulebookOpen, setIsRulebookOpen] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGameBoard, setShowGameBoard] = useState(false);
  const [showRoleAnnouncement, setShowRoleAnnouncement] = useState(false);

  useEffect(() => {
    return () => resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (gameState?.status === ROOM_STATUS.PLAYING && !showGameBoard) {
      setIsLoading(false);
      setIsTransitioning(true);

      const transitionTimer = setTimeout(() => {
        setIsTransitioning(false);
        setShowGameBoard(true);
        setShowRoleAnnouncement(true);

        setTimeout(() => {
          setShowRoleAnnouncement(false);
        }, 2500);
      }, 2500);

      return () => clearTimeout(transitionTimer);
    }
  }, [gameState?.status, showGameBoard]);

  const handleSelectRole = async (faction) => {
    setSelectedRole(faction);
    setIsLoading(true);
    await selectRole(roomCode, faction);
  };

  const handleSurrender = async () => {
    if (window.confirm("Bạn có chắc chắn muốn bỏ cuộc?")) {
      await surrender(roomCode);
      setIsSettingsOpen(false);
    }
  };

  // LOGIC KẾT THÚC VÒNG TẠI HEADER
  const myPlayer = gameState?.players?.find(
    (p) => p.userId.toLowerCase() === user?.id?.toLowerCase(),
  );
  const isDracula = myPlayer?.faction === FACTION.DRACULA;
  const isMyTurn =
    gameState?.currentTurnUserId?.toLowerCase() === user?.id?.toLowerCase();

  const hasDrawnCard = !!myPlayer?.drawnCard;
  const pendingSkill = gameState?.pendingSkillValue;
  const discardPileLength = gameState?.discardPile?.length || 0;

  // Điều kiện để hiện nút "Gọi Kết Thúc Vòng"
  const canCallEndRound =
    showGameBoard &&
    isMyTurn &&
    !hasDrawnCard &&
    !pendingSkill &&
    discardPileLength >= 6;

  const handleCallEndRound = async () => {
    if (canCallEndRound) {
      if (
        window.confirm(
          "Mộ bài đã đủ 6 lá. Bạn có muốn Kết Thúc Vòng ngay lúc này?",
        )
      ) {
        await callEndRound(roomCode);
      }
    }
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
        <Button
          onClick={() => {
            resetGame();
            navigate(ROUTES.LOBBY);
          }}
          variant="cold"
        >
          Quay lại Sảnh
        </Button>
      </div>
    );
  }

  const isWaiting =
    !gameState ||
    (gameState.status === ROOM_STATUS.WAITING && gameState.players?.length < 2);
  const isSelectingRole =
    gameState?.status === ROOM_STATUS.WAITING &&
    gameState?.players?.length === 2;
  const isFinished = gameState?.status === ROOM_STATUS.FINISHED;

  const renderCurrentPhase = () => {
    if (isWaiting) return <WaitingPhase roomCode={roomCode} />;
    if (isSelectingRole) {
      return (
        <RoleSelectionPhase
          selectedRole={selectedRole}
          isLoading={isLoading}
          onSelectRole={handleSelectRole}
        />
      );
    }
    if (isTransitioning) {
      return <TransitionPhase />;
    }
    if (showGameBoard || isFinished) {
      return (
        <div className="flex-grow w-full h-full animate-in fade-in duration-1000 relative">
          <GameBoard />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-game-dark-teal text-game-bone-white relative overflow-hidden flex flex-col font-['Inter'] selection:bg-game-dracula-orange/30">
      {isFinished && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-500">
          <div className="bg-[#0d1316] border border-white/10 p-12 flex flex-col items-center text-center shadow-[0_0_100px_rgba(0,0,0,1)] rounded-sm">
            <h2
              className={`text-5xl md:text-7xl font-black uppercase mb-6 font-['Playfair_Display'] ${gameState.winnerId.toLowerCase() === user.id.toLowerCase() ? "text-game-dracula-orange drop-shadow-[0_0_20px_rgba(225,85,37,0.5)]" : "text-game-vanhelsing-blood drop-shadow-[0_0_20px_rgba(154,27,31,0.5)]"}`}
            >
              {gameState.winnerId.toLowerCase() === user.id.toLowerCase()
                ? "Chiến Thắng"
                : "Thất Bại"}
            </h2>
            <p className="text-white/60 mb-10 uppercase tracking-[0.3em] text-xs font-bold">
              {gameState.endReason === "Surrender"
                ? gameState.winnerId.toLowerCase() === user.id.toLowerCase()
                  ? "Đối thủ đã hèn nhát bỏ cuộc."
                  : "Bạn đã đầu hàng trước nỗi sợ."
                : "Hiệp ước đã kết thúc."}
            </p>
            <Button
              onClick={() => {
                resetGame();
                navigate(ROUTES.LOBBY);
              }}
              variant={
                gameState.winnerId.toLowerCase() === user.id.toLowerCase()
                  ? "dracula"
                  : "vanhelsing"
              }
            >
              Trở Về Sảnh Chờ
            </Button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showRoleAnnouncement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
          >
            <div className="flex flex-col items-center">
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 uppercase tracking-[0.5em] text-xs md:text-sm font-bold mb-4"
              >
                Bạn hóa thân thành
              </motion.p>
              <h2
                className={`text-6xl md:text-8xl font-black uppercase font-['Playfair_Display'] ${
                  isDracula
                    ? "text-game-dracula-orange drop-shadow-[0_0_40px_rgba(225,85,37,0.8)]"
                    : "text-game-vanhelsing-blood drop-shadow-[0_0_40px_rgba(154,27,31,0.8)]"
                }`}
              >
                {isDracula ? "Dracula" : "Van Helsing"}
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -bottom-40 -left-40 w-[50vw] h-[50vw] bg-game-vanhelsing-blood rounded-full blur-[200px] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-[50vw] h-[50vw] bg-game-dracula-orange rounded-full blur-[200px] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_10%,_rgba(0,0,0,0.7)_100%)]"></div>
      </div>

      {!isTransitioning && (
        <header className="p-6 md:px-10 border-b border-white/5 relative z-20 flex items-center justify-between backdrop-blur-md bg-black/20">
          <div className="flex items-center gap-6 w-1/3">
            <div className="bg-black/40 px-4 py-2 border border-white/5 text-[10px] uppercase tracking-[0.3em] text-game-bone-white/80 font-bold min-w-[180px] text-center">
              {isWaiting && "Đang chờ đối thủ..."}
              {isSelectingRole && "Nghi lễ chọn phe..."}
              {(showGameBoard || isFinished) &&
                gameState &&
                `Vòng ${gameState.roundNumber} - Phe ${isDracula ? "Đêm Tối" : "Thợ Săn"}`}
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <h2 className="text-xl font-black text-game-bone-white uppercase tracking-widest shadow-text-md font-['Playfair_Display'] hidden xl:block whitespace-nowrap">
              Hiệp Ước:{" "}
              <span className="text-game-dracula-orange tracking-[0.3em] ml-2">
                {roomCode}
              </span>
            </h2>
          </div>

          <div className="flex-1 flex justify-center">
            {showGameBoard && !isFinished && !showRoleAnnouncement && (
              <div className="pointer-events-none animate-in fade-in duration-500">
                {isMyTurn ? (
                  <div className="bg-[#0a0f12]/90 border border-game-dracula-orange/60 text-game-dracula-orange px-6 py-1.5 xl:px-8 xl:py-2 rounded-full text-[10px] xl:text-xs font-black uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(225,85,37,0.4)] animate-pulse">
                    Lượt của bạn
                  </div>
                ) : (
                  <div className="bg-[#0a0f12]/80 border border-white/10 text-white/40 px-6 py-1.5 xl:px-8 xl:py-2 rounded-full text-[10px] xl:text-xs font-bold uppercase tracking-[0.2em]">
                    Đối thủ đang suy nghĩ...
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative flex justify-end w-1/3 items-center gap-2 xl:gap-4">
            {/* NÚT GỌI KẾT THÚC VÒNG TRÊN HEADER */}
            {canCallEndRound && !isFinished && (
              <button
                onClick={handleCallEndRound}
                className="px-4 py-2 mr-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border whitespace-nowrap bg-game-vanhelsing-blood/20 border-game-vanhelsing-blood text-game-vanhelsing-blood hover:bg-game-vanhelsing-blood hover:text-white shadow-[0_0_15px_rgba(154,27,31,0.5)] animate-in fade-in duration-300"
              >
                Kết Thúc Vòng
              </button>
            )}

            <button
              onClick={() => setIsRulebookOpen(true)}
              className="p-2 text-white/40 hover:text-game-dracula-orange transition-colors duration-300 outline-none"
              title="Sách Luật"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </button>

            <div className="w-px h-6 bg-white/10 hidden sm:block"></div>

            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 text-white/40 hover:text-white hover:rotate-90 transition-all duration-300 outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {isSettingsOpen && (
                <div className="absolute top-full mt-4 right-0 w-56 bg-[#0d1316]/95 backdrop-blur-md border border-white/10 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                      Tùy chỉnh
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      setIsSettingsOpen(false);
                      await leaveRoom();
                      navigate(ROUTES.LOBBY);
                    }}
                    className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                    disabled={showGameBoard && !isFinished}
                  >
                    Về Sảnh (Thoát)
                  </button>
                  {showGameBoard && !isFinished && (
                    <button
                      onClick={handleSurrender}
                      className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest text-game-vanhelsing-blood hover:bg-game-vanhelsing-blood/10 transition-colors font-bold"
                    >
                      Đầu Hàng
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      <main
        className={`flex-grow p-6 md:p-10 relative z-10 flex flex-col ${isTransitioning ? "p-0" : ""}`}
      >
        <div className="max-w-7xl mx-auto h-full w-full flex-grow flex flex-col justify-center">
          {renderCurrentPhase()}
        </div>
      </main>

      <RulebookModal
        isOpen={isRulebookOpen}
        onClose={() => setIsRulebookOpen(false)}
      />
    </div>
  );
};

export default GameRoom;
