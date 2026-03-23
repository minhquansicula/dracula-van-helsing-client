/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        // Bảng màu chủ đạo dựa trên game
        game: {
          "dark-teal": "#0C2A31", // Đêm tối lạnh lẽo
          "dracula-orange": "#E15525", // Lửa của Dracula
          "vanhelsing-blood": "#9A1B1F", // Máu của Van Helsing
          "bone-white": "#D4D6C6", // Con đường lạnh
        },
        // Màu thẻ bài (Hỗ trợ định nghĩa CardColor)
        card: {
          red: "#E15525", // Trùng với Dracula
          purple: "#6C3C96", // Tím ma thuật tối
          green: "#19803C", // Xanh đêm tối
          yellow: "#FFD151", // Vàng lạnh
        },
        // Màu mã thông báo (Tokens)
        token: {
          human: "#D4D6C6", // Người dân (bone-white)
          vampire: "#E15525", // Ma cà rồng (dracula-orange)
          trump: "#D4D6C6", // Token màu Trump mặc định (lạnh)
        },
      },
    },
  },
  plugins: [],
};
