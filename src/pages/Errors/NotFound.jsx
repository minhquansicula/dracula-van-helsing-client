import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-game-dark-teal text-game-bone-white p-4">
      <h1 className="text-6xl font-black text-game-vanhelsing-blood mb-4 shadow-text-lg">
        404
      </h1>
      <p className="text-xl mb-8">Khu vực này không tồn tại trên bản đồ.</p>
      <Link
        to={ROUTES.HOME}
        className="text-game-dracula-orange hover:underline font-bold"
      >
        Trở về Sảnh chờ
      </Link>
    </div>
  );
};

export default NotFound;
