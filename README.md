# Dracula vs Van Helsing - Web Client
Welcome to the Dracula vs Van Helsing frontend repository. This project provides an interactive, modern, and responsive user interface for players to engage in asymmetric strategic battles within a real-time multiplayer board game setting. Explore the live version at https://boardgame-dracula-vanhelsing.vercel.app/.

Backend Repository: https://github.com/minhquansicula/dracula-vanhelsing-api

## Key Features
- **Interactive Game Board:** Modern UI/UX design with smooth drag-and-drop/click mechanics for card playing and token movements.
- **Real-Time Synchronization:** Seamless gameplay with sub-second latency powered by a SignalR WebSocket client.
- **Asymmetric Interface:** Distinct visual themes and dashboards tailored to whether the player is acting as Dracula or Van Helsing.
- **Lobby & Matchmaking:** Real-time room creation, shareable room codes, and live status updates.
- **Secure Access:** JWT-based authentication flow for user login and registration.

## Prerequisites
Ensure the following are installed on your system before starting:

- Node.js (v18 or higher recommended)

- npm or yarn

- Git (required for cloning the repository)

## Tech Stack
- **Core:** React.js, Vite
- **Styling:** Tailwind CSS *(Focused on clean aesthetics and modern UI patterns)*
- **State Management & Routing:** React Router DOM
- **Real-time Communication:** @microsoft/signalr

## Project Structure
The project is organized into a modular structure for optimal scalability and maintenance:

- src/assets/: Static assets (images, fonts, icons)

- src/components/: Reusable UI components (Buttons, Cards, Modals)

- src/contexts/: React Contexts (AuthContext, GameContext)

- src/hooks/: Custom React hooks (useSignalR, useAuth)

- src/pages/: Main route pages (Home, Login, GameBoard, Lobby)

- src/services/: API and WebSocket connection logic

- src/utils/: Helper functions and constants

## Installation and Running
1. Clone the repository:

```bash
git clone https://github.com/minhquansicula/dracula-frontend.git
cd dracula-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment Variables:
Create a .env file in the root directory (alongside package.json). Add the following variables to connect to your local backend. Replace xxxx with your .NET server port (e.g., 5001 or 7280):

Đoạn mã
VITE_API_URL=https://localhost:xxxx/api
VITE_HUB_URL=https://localhost:xxxx/gamehub
4. Start the development server:

```bash
npm run dev
```
The application will open automatically, or you can access it in your browser at http://localhost:5173.

Deployment
This project is optimized for deployment on Vercel.

Important Deployment Note: Ensure that you have declared all environment variables (VITE_API_URL and VITE_HUB_URL) in the Environment Variables section of your Vercel dashboard. These must point directly to your live API on Azure App Service (e.g., https://draculavanhelsingapi...azurewebsites.net/api and https://draculavanhelsingapi...azurewebsites.net/gamehub).
