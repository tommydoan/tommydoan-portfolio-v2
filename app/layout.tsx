import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor"; // <-- THÊM DÒNG NÀY: Import con trỏ phát sáng

// Sử dụng font Urbanist chuẩn phong cách thiết kế hiện đại
const font = Urbanist({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  // Sửa lỗi ⚠ metadataBase bằng cách thêm URL chính thức của bạn
  metadataBase: new URL("https://tommydoan-portfolio-v2.vercel.app/"),
  title: "Đoàn Công Minh | Kĩ sư phần mềm & Lập trình viên",
  description: "Portfolio chuyên nghiệp của Đoàn Công Minh (Tommy Doan) - Chuyên gia hệ thống, IoT và AI.",
  keywords: ["Đoàn Công Minh", "Tommy Doan", "Software Engineer", "Next.js Portfolio", "IoT Specialist"],
  openGraph: {
    title: "Đoàn Công Minh | Technical Portfolio",
    description: "Khám phá các dự án về C++, Python, Neo4j và Hệ thống IoT của tôi.",
    url: "https://tommydoan-portfolio-v2.vercel.app/",
    siteName: "Minh Portfolio",
    images: [
      {
        url: "/og-image.png", // Đảm bảo bạn có file này trong thư mục public/
        width: 1200,
        height: 630,
        alt: "Đoàn Công Minh Portfolio Cover",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đoàn Công Minh | Software Engineer",
    description: "Kiến tạo những giải pháp công nghệ bền vững.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/* - bg-grid-tech: Kích hoạt lưới nền Emerald từ globals.css
        - selection:bg-emerald-500: Đổi màu khi bôi đen văn bản cho "xịn xò"
      */}
      <body className={`${font.className} bg-grid-tech selection:bg-emerald-500/30 selection:text-emerald-500 antialiased`}>
        
        <CustomCursor /> {/* <-- THÊM DÒNG NÀY: Đặt ngay sau thẻ body */}

        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}