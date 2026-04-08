// src/store/useGameStore.js
import { create } from "zustand";
import { signalrService } from "../services/signalrService";

const useGameStore = create((set, get) => ({
  isConnected: false,
  gameState: null,
  error: null,
  roomCode: null,

  connect: async (token) => {
    if (get().isConnected) return;

    try {
      await signalrService.connect(token, {
        onRoomCreated: (roomCode) => set({ roomCode: roomCode, error: null }),
        onRoomReadyToSelectRole: (state) =>
          set({ gameState: state, roomCode: state.roomCode, error: null }),
        onOpponentSelectedRole: () =>
          console.log("[GameStore] Đối thủ đã chọn xong phe"),
        onGameStateUpdated: (state) => set({ gameState: state, error: null }),
        onGameStarted: (state) => set({ gameState: state, error: null }),
        onGameEnded: (state) => set({ gameState: state }),
        onError: (message) => set({ error: message }),
      });

      set({ isConnected: true });
    } catch (err) {
      set({ error: "Không thể kết nối đến máy chủ trò chơi." });
    }
  },

  checkActiveMatch: async () => {
    try {
      const activeRoomCode = await signalrService.checkCurrentActiveMatch();
      if (activeRoomCode) {
        set({ roomCode: activeRoomCode });
        return activeRoomCode;
      }
    } catch (err) {
      console.error("Lỗi khi kiểm tra trận đấu cũ: ", err);
    }
    return null;
  },

  disconnect: async () => {
    await signalrService.disconnect();
    set({ isConnected: false, gameState: null, roomCode: null, error: null });
  },

  createRoom: async () => {
    try {
      await signalrService.createRoom();
    } catch (error) {
      set({ error: "Không thể tạo phòng." });
    }
  },

  joinRoom: async (code) => {
    try {
      await signalrService.joinRoom(code);
    } catch (error) {
      set({ error: "Không thể vào phòng." });
    }
  },

  leaveRoom: async () => {
    try {
      await signalrService.leaveRoom();
      set({ roomCode: null, gameState: null, error: null });
    } catch (error) {
      console.error("Lỗi khi rời phòng:", error);
    }
  },

  selectRole: async (code, requestedFaction) => {
    try {
      await signalrService.selectRole(code, requestedFaction);
    } catch (error) {
      set({ error: "Lỗi khi chọn vai trò." });
    }
  },

  drawCard: async (code) => {
    try {
      await signalrService.drawCard(code);
    } catch (error) {
      set({ error: "Không thể rút bài." });
    }
  },

  playCard: async (code, discardedCardId) => {
    try {
      await signalrService.playCard(code, discardedCardId);
    } catch (error) {
      set({ error: "Không thể đánh bài." });
    }
  },

  submitSkillAction: async (code, payload) => {
    try {
      await signalrService.submitSkillAction(code, payload);
    } catch (error) {
      set({ error: "Lỗi khi dùng kỹ năng." });
    }
  },

  callEndRound: async (code) => {
    try {
      await signalrService.callEndRound(code);
    } catch (error) {
      set({ error: "Lỗi khi gọi kết thúc vòng." });
    }
  },

  surrender: async (code) => {
    try {
      await signalrService.surrender(code);
    } catch (error) {
      set({ error: "Lỗi khi đầu hàng." });
    }
  },

  clearError: () => set({ error: null }),
  resetGame: () => set({ gameState: null, roomCode: null, error: null }),
}));

export default useGameStore;
