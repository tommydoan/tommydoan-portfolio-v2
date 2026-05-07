import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tommy Doan | Software Engineer Portfolio",
  description: "Software Engineer specializing in Systems, IoT, and AI. Explore my technical projects and expertise.",
  keywords: ["Tommy Doan", "Software Engineer", "Portfolio", "Next.js", "Systems Programming", "C++", "AI"],
  openGraph: {
    title: "Tommy Doan | Technical Portfolio",
    description: "Expertise in C++, Python, Neo4j, and IoT Systems.",
    url: "https://your-domain.com", // Thay bằng link Vercel của bạn
    siteName: "Tommy Doan Portfolio",
    images: [
      {
        url: "/og-image.png", // Bạn hãy tạo 1 tấm ảnh chụp màn hình web và bỏ vào thư mục public
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${font.className} transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}