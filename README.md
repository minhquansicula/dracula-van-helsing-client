🧛‍♂️ Dracula vs Van Helsing - Web Client

This is the frontend repository for the Dracula vs Van Helsing real-time multiplayer board game. It provides an interactive, modern, and responsive user interface for players to engage in asymmetric strategic battles.

🔗 Backend Repository: https://github.com/minhquansicula/dracula-api-backend
🌐 Live Demo: https://boardgame-dracula-vanhelsing.vercel.app/

✨ Key Features

Interactive Game Board: Modern UI/UX design with smooth drag-and-drop/click mechanics for card playing and token movements.

Real-Time Synchronization: Seamless gameplay with sub-second latency powered by SignalR WebSocket client.

Asymmetric Interface: Distinct visual themes and dashboards depending on whether the player is playing as Dracula or Van Helsing.

Lobby & Matchmaking: Real-time room creation, sharing room codes, and live status updates.

Secure Access: JWT-based authentication flow for user login and registration.

🛠 Tech Stack

Core: React.js, Vite (Build Tool)

Styling: Tailwind CSS (Focus on clean aesthetics and modern UI patterns)

State Management & Routing: React Router DOM

Real-time Communication: @microsoft/signalr

🚀 Local Development Setup

Prerequisites

Make sure you have the following installed on your machine:

Node.js (v18 or higher)

npm or yarn

Installation Steps

Clone the repository:

git clone [https://github.com/minhquansicula/dracula-frontend.git](https://github.com/minhquansicula/dracula-frontend.git)
cd dracula-frontend


Install dependencies:
Sử dụng npm để cài đặt các thư viện cần thiết:

npm install


Configure Environment Variables:
Tạo một file .env ở thư mục gốc của dự án (ngang hàng với file package.json). Thêm các biến môi trường sau để kết nối với Backend cục bộ:

VITE_API_URL=https://localhost:xxxx/api
VITE_HUB_URL=https://localhost:xxxx/gamehub


(Lưu ý: Thay thế xxxx bằng port mà server .NET của bạn đang chạy, ví dụ: 5001 hoặc 7280).

Start the development server:
Khởi chạy ứng dụng trên môi trường local:

npm run dev


Ứng dụng sẽ tự động mở hoặc bạn có thể truy cập thông qua trình duyệt tại địa chỉ: http://localhost:5173.

📁 Project Structure (Overview)

Cấu trúc thư mục được thiết kế theo module để dễ dàng mở rộng và bảo trì:

src/
├── assets/          # Static assets (images, fonts, icons)
├── components/      # Reusable UI components (Buttons, Cards, Modals)
├── contexts/        # React Contexts (AuthContext, GameContext)
├── hooks/           # Custom React hooks (useSignalR, useAuth)
├── pages/           # Main route pages (Home, Login, GameBoard, Lobby)
├── services/        # API and WebSocket connection logic
└── utils/           # Helper functions and constants


🌐 Deployment

Dự án này được tối ưu để triển khai (deploy) trên nền tảng Vercel.

Lưu ý quan trọng khi deploy: Hãy đảm bảo bạn đã khai báo đầy đủ các biến môi trường (VITE_API_URL và VITE_HUB_URL) trong phần Environment Variables trên dashboard của Vercel, trỏ chính xác về link API thật trên Azure App Service (VD: https://draculavanhelsingapi...azurewebsites.net/api và https://draculavanhelsingapi...azurewebsites.net/gamehub).
