// src/components/game/RulebookModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RulebookModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("goal");

  if (!isOpen) return null;

  const tabs = [
    { id: "goal", label: "Mục Tiêu & Tổng Quan" },
    { id: "gameplay", label: "Luật Chơi Cốt Lõi" },
    { id: "combat", label: "Giao Tranh Quận" },
    { id: "skills", label: "Quyền Năng (1-8)" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-5xl h-[85vh] bg-[#0a0f12] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] rounded-sm flex flex-col md:flex-row overflow-hidden"
        >
          {/* Trang trí góc cổ điển */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-game-dracula-orange/30 pointer-events-none m-2" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-game-vanhelsing-blood/30 pointer-events-none m-2" />

          {/* Cột điều hướng (Sidebar) */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 bg-black/40 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,85,37,0.05),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(154,27,31,0.05),transparent_50%)] pointer-events-none" />

            <div className="p-8 pb-4 relative z-10 flex justify-between items-center md:block">
              <h2 className="text-3xl font-black text-white uppercase tracking-widest font-['Playfair_Display'] drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                Sách <br className="hidden md:block" />
                <span className="text-game-dracula-orange">Luật Cổ</span>
              </h2>
              <button
                onClick={onClose}
                className="md:hidden text-white/50 hover:text-white"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-row md:flex-col gap-2 p-4 md:p-8 overflow-x-auto md:overflow-visible relative z-10 custom-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-4 md:px-6 py-3 uppercase tracking-widest text-xs font-bold transition-all whitespace-nowrap md:whitespace-normal duration-300 ${
                    activeTab === tab.id
                      ? "bg-white/10 text-white border-l-2 border-game-dracula-orange shadow-[inset_10px_0_20px_rgba(225,85,37,0.1)]"
                      : "text-white/40 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cột Nội dung */}
          <div className="w-full md:w-2/3 flex-1 overflow-y-auto p-8 md:p-12 text-game-bone-white/80 leading-relaxed custom-scrollbar relative">
            {/* Nút đóng (Desktop) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/30 hover:text-white hover:rotate-90 transition-all duration-300 hidden md:block"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {activeTab === "goal" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-black text-game-vanhelsing-blood uppercase tracking-widest font-['Playfair_Display']">
                  Mục Tiêu & Điều Kiện Thắng
                </h3>
                <div className="space-y-6">
                  <div className="bg-game-dracula-orange/5 border border-game-dracula-orange/20 p-6 rounded-sm">
                    <h4 className="text-game-dracula-orange font-bold uppercase tracking-widest mb-3">
                      Phe Dracula
                    </h4>
                    <p className="text-sm">
                      Bắt đầu với 12 HP (Máu). Bạn chiến thắng ngay lập tức nếu
                      thực hiện được 1 trong 2 điều sau:
                    </p>
                    <ul className="list-disc list-inside mt-3 text-sm space-y-2 opacity-80">
                      <li>
                        Biến toàn bộ 4 Dân Làng ở cùng 1 Quận bất kỳ thành Ma Cà
                        Rồng.
                      </li>
                      <li>
                        Sống sót thành công cho đến khi kết thúc vòng đấu thứ 5.
                      </li>
                    </ul>
                  </div>
                  <div className="bg-game-vanhelsing-blood/5 border border-game-vanhelsing-blood/20 p-6 rounded-sm">
                    <h4 className="text-game-vanhelsing-blood font-bold uppercase tracking-widest mb-3">
                      Phe Van Helsing
                    </h4>
                    <p className="text-sm">
                      Không có lượng máu cố định. Bạn chiến thắng ngay lập tức
                      nếu:
                    </p>
                    <ul className="list-disc list-inside mt-3 text-sm space-y-2 opacity-80">
                      <li>
                        Rút cạn 12 HP của Dracula trước khi kết thúc vòng đấu
                        thứ 5.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "gameplay" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-widest font-['Playfair_Display']">
                  Luật Chơi Cốt Lõi
                </h3>
                <p className="text-sm">
                  Trò chơi diễn ra tối đa trong 5 vòng. Ở mỗi lượt, bạn phải
                  thực hiện chuỗi hành động sau:
                </p>

                <div className="pl-4 border-l border-white/20 space-y-4 text-sm">
                  <p>
                    <strong>1. Rút bài:</strong> Rút 1 lá bài từ bộ bài chính.
                  </p>
                  <p>
                    <strong>2. Đánh bài:</strong> Bạn có 2 lựa chọn:
                  </p>
                  <ul className="list-disc list-inside pl-4 text-white/60 space-y-2">
                    <li>Vứt thẳng lá vừa rút vào Mộ Bài.</li>
                    <li>
                      Đổi lá vừa rút với 1 trong 5 lá đang úp trên tay của bạn,
                      sau đó vứt lá bài cũ vừa bị đổi vào Mộ Bài.
                    </li>
                  </ul>
                  <p>
                    <strong>3. Kích hoạt Kỹ năng:</strong> Kỹ năng của lá bài
                    vừa ném vào Mộ Bài sẽ{" "}
                    <span className="text-game-dracula-orange font-bold">
                      bắt buộc được kích hoạt
                    </span>{" "}
                    (dù đó là lá vừa rút hay lá bị thay ra).
                  </p>
                </div>

                <div className="bg-white/5 p-6 border border-white/10 rounded-sm">
                  <h4 className="text-white uppercase tracking-widest mb-2 font-bold text-sm">
                    Gọi Kết Thúc Vòng
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Thay vì rút và vứt bài, nếu Mộ Bài có từ{" "}
                    <strong className="text-game-dracula-orange">
                      6 lá bài trở lên
                    </strong>
                    , bạn có thể gọi Kết Thúc Vòng. Đối thủ sẽ được đánh thêm 1
                    lượt cuối cùng trước khi vòng đấu khép lại và bắt đầu bước
                    Giao Tranh.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "combat" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-black text-game-bone-white uppercase tracking-widest font-['Playfair_Display']">
                  Giao Tranh & Tính Điểm
                </h3>
                <p className="text-sm">
                  Khi vòng đấu kết thúc (do hết bài rút hoặc có người Gọi Kết
                  Thúc Vòng), hai bên sẽ lật bài và đọ sức ở từng Quận
                  (District) từ trái sang phải.
                </p>

                <div className="bg-[#11181c] p-6 border border-white/10 rounded-sm shadow-inner">
                  <h4 className="text-game-dracula-orange uppercase tracking-widest mb-4 font-bold text-sm border-b border-white/10 pb-2">
                    Thứ Tự Ưu Tiên Thắng Thua
                  </h4>
                  <ol className="list-decimal list-inside space-y-4 text-sm text-white/80">
                    <li>
                      <span className="text-white font-bold">
                        Chất Bài Chủ (Trump Color):
                      </span>{" "}
                      Nếu 1 trong 2 lá có màu trùng với màu đang đứng{" "}
                      <strong className="text-game-dracula-orange">
                        Cao Nhất
                      </strong>{" "}
                      trên Bảng Màu, lá đó thắng.
                    </li>
                    <li>
                      <span className="text-white font-bold">
                        Đọ Số (Giá trị bài):
                      </span>{" "}
                      Nếu cả 2 cùng là Trump Color, hoặc cùng KHÔNG phải Trump
                      Color, lá nào có{" "}
                      <strong className="text-game-dracula-orange">
                        số lớn hơn
                      </strong>{" "}
                      sẽ thắng.
                    </li>
                    <li>
                      <span className="text-white font-bold">Đọ Hạng Màu:</span>{" "}
                      Nếu 2 lá <strong className="text-white">cùng số</strong>,
                      lá nào có màu nằm ở vị trí cao hơn trên Bảng Màu (Color
                      Ranking Board) sẽ thắng.
                    </li>
                  </ol>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 bg-game-dracula-orange/10 p-4 border border-game-dracula-orange/20 text-center rounded-sm">
                    <p className="text-[10px] uppercase tracking-widest text-game-dracula-orange font-bold mb-2">
                      Dracula Thắng Quận
                    </p>
                    <p className="text-xs">
                      Biến 1 Dân Làng ở Quận đó thành Ma Cà Rồng.
                    </p>
                  </div>
                  <div className="flex-1 bg-game-vanhelsing-blood/10 p-4 border border-game-vanhelsing-blood/20 text-center rounded-sm">
                    <p className="text-[10px] uppercase tracking-widest text-game-vanhelsing-blood font-bold mb-2">
                      Van Helsing Thắng
                    </p>
                    <p className="text-xs">
                      Tiêu hao 1 HP của Lãnh chúa Dracula.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-widest font-['Playfair_Display'] mb-8">
                  Quyền Năng Lá Bài
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      val: 1,
                      text: "Lộ diện 1 lá bài đang úp của bản thân để hù dọa đối thủ.",
                    },
                    {
                      val: 2,
                      text: "Lật lộ diện lá bài nằm trên cùng của Bộ Bài Rút.",
                    },
                    {
                      val: 3,
                      text: "Bắt buộc đối thủ lộ diện 1 lá bài đang úp của họ.",
                    },
                    {
                      val: 4,
                      text: "Hoán đổi vị trí 2 lá bài đang nằm trên tay bạn.",
                    },
                    {
                      val: 5,
                      text: "Kích hoạt hiệu ứng Thêm Lượt. Bạn được đi tiếp 1 lượt ngay lập tức.",
                    },
                    {
                      val: 6,
                      text: "Hoán đổi 1 lá bài của bạn với lá bài của đối thủ ở cùng vị trí Quận tương ứng.",
                    },
                    {
                      val: 7,
                      text: "Chọn 2 Token Màu trên Bảng Xếp Hạng Màu và hoán đổi vị trí của chúng.",
                    },
                    {
                      val: 8,
                      text: "Bắt buộc Kết Thúc Vòng ngay lập tức. (Chỉ được vứt lá này nếu Mộ Bài đã có ít nhất 5 lá khác).",
                    },
                  ].map((skill) => (
                    <div
                      key={skill.val}
                      className="flex gap-4 bg-white/5 border border-white/10 p-4 hover:border-game-dracula-orange/40 transition-colors"
                    >
                      <div className="w-10 h-10 shrink-0 bg-black/60 border border-game-dracula-orange/30 flex items-center justify-center font-['Playfair_Display'] font-black text-xl text-game-dracula-orange">
                        {skill.val}
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed flex-1">
                        {skill.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RulebookModal;
