import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

const RoomCodeInput = forwardRef(
  ({ length = 6, onComplete, disabled }, ref) => {
    const [code, setCode] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    // Cho phép component cha gọi hàm clear() để xóa trắng khi có lỗi
    useImperativeHandle(ref, () => ({
      clear: () => {
        setCode(new Array(length).fill(""));
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      },
    }));

    const handleChange = (element, index) => {
      const value = element.value.toUpperCase();
      if (/[^A-Z0-9]/.test(value)) return;

      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Tự động chuyển focus sang ô tiếp theo
      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Gọi hàm onComplete khi đã nhập đủ
      if (newCode.every((char) => char !== "") && newCode.length === length) {
        if (onComplete) onComplete(newCode.join(""));
      }
    };

    const handleKeyDown = (e, index) => {
      // Quay lại ô trước đó nếu nhấn Backspace ở ô trống
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };

    return (
      <div className="w-full mt-auto flex justify-center gap-2 h-14 md:h-16">
        {code.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={(el) => (inputRefs.current[index] = el)}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 md:w-12 h-full bg-black/40 border border-white/10 text-game-dracula-orange text-2xl font-black text-center focus:border-game-dracula-orange focus:outline-none transition-all duration-300 rounded-none font-['Playfair_Display'] disabled:opacity-50"
            disabled={disabled}
          />
        ))}
      </div>
    );
  },
);

RoomCodeInput.displayName = "RoomCodeInput";

export default RoomCodeInput;
