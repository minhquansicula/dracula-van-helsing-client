import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Lobby = () => {
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="min-h-screen bg-game-dark-teal text-game-bone-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-game-dracula-orange mb-2">
          DRACULA VS VAN HELSING
        </h1>
        <p className="text-xl">Lobby</p>
      </header>

      <main className="max-w-md mx-auto">
        <div className="bg-black bg-opacity-30 rounded-lg p-8 mb-8 border border-game-dark-teal">
          <h2 className="text-2xl font-bold text-game-bone-white mb-6">
            Tạo hoặc Tham gia phòng
          </h2>

          {/* Section Create Room */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-game-dracula-orange mb-4">
              Tạo phòng mới
            </h3>
            <Button variant="dracula" className="w-full">
              TẠO PHÒNG MỚI (Dracula)
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-game-dark-teal"></div>
            </div>
            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-3 text-game-dark-teal bg-game-dark-teal bg-opacity-50 rounded-full">
                hoặc
              </span>
            </div>
          </div>

          {/* Section Join Room */}
          <div>
            <h3 className="text-lg font-semibold text-game-vanhelsing-blood mb-4">
              Tham gia phòng có sẵn
            </h3>
            <Input
              label="Nhập mã phòng"
              placeholder="Ví dụ: AB1234"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button variant="cold" className="w-full">
              THAM GIA PHÒNG (Van Helsing)
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lobby;
