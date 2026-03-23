import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth"; // Đảm bảo đường dẫn import đúng
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (password !== confirmPassword) {
      errors.confirmPassword = "Mật ngữ xác nhận không trùng khớp.";
    }
    if (password.length < 6) {
      errors.password = "Mật ngữ quá yếu. Cần ít nhất 6 ký tự.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!validateForm()) return;

    // Gọi API qua useAuth hook. Thuộc tính phải khớp với DTO C# của bạn
    const result = await registerUser({ username, email, password });

    if (result.success) {
      setIsTransitioning(true);
      setTimeout(() => {
        navigate(ROUTES.LOBBY);
      }, 700);
    } else {
      setLocalError(result.message);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-700 ${isTransitioning ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-game-dark-teal transition-all duration-700 ${isTransitioning ? "opacity-0 blur-md scale-95" : "opacity-100 blur-0 scale-100"}`}
      >
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-game-vanhelsing-blood rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-game-bone-white rounded-full blur-[150px] opacity-10"></div>

        <div className="bg-black/60 p-10 rounded-sm border border-game-bone-white/10 w-full max-w-md shadow-[0_0_60px_rgba(0,0,0,0.8)] relative z-10 backdrop-blur-sm">
          <header className="text-center mb-10">
            <h1 className="text-game-vanhelsing-blood text-xs font-black uppercase tracking-[0.3em] mb-2 shadow-text-sm">
              Dracula vs Van Helsing
            </h1>
            <h2 className="text-4xl font-extrabold text-game-bone-white uppercase tracking-tighter shadow-text-lg">
              Ký Hiệp Ước
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-game-vanhelsing-blood to-transparent mx-auto mt-4"></div>
          </header>

          {localError && (
            <div className="bg-game-dracula-orange/20 border border-game-dracula-orange text-game-bone-white px-4 py-3 rounded-sm mb-6 text-center text-sm italic shadow-[0_0_15px_rgba(225,85,37,0.5)]">
              {localError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Chọn danh tính (Username)"
              type="text"
              placeholder="Kẻ săn hay kẻ bị săn?..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Địa chỉ Linh hồn (Email)"
              type="email"
              placeholder="linhhon@demto.i"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Mật ngữ quyền năng"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={fieldErrors.password}
            />
            <Input
              label="Xác nhận mật ngữ"
              type="password"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={fieldErrors.confirmPassword}
            />

            <Button
              type="submit"
              variant="vanhelsing"
              className="w-full mt-4"
              isLoading={isLoading}
            >
              Tham Gia Cuộc Chiến
            </Button>
          </form>

          <footer className="text-center mt-8 pt-6 border-t border-game-bone-white/10">
            <p className="text-game-bone-white/70 text-xs uppercase tracking-widest">
              Đã ký kết từ trước?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="text-game-vanhelsing-blood hover:text-white font-black transition-colors hover:shadow-text-sm"
              >
                Đăng nhập
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Register;
