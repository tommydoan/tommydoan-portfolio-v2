"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  // Khởi tạo vị trí ngoài màn hình, bỏ luôn biến isMounted để tối ưu hiệu suất
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []); // Không còn lỗi ESLint nữa!

  return (
    <>
      {/* Vòng sáng mờ bên ngoài - Đã sửa z-[9999] thành z-9999 */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-emerald-500/30 bg-emerald-500/10 rounded-full pointer-events-none z-9999 flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />

      {/* Điểm sáng rực lõi bên trong - Đã sửa z-[10000] thành z-10000 */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-emerald-400 rounded-full pointer-events-none z-10000 shadow-[0_0_10px_#34d399]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0
        }}
      />
    </>
  );
}