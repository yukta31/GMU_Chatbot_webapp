"use client";
import ThemeModeProvider from "./context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeModeProvider>
          {children}
        </ThemeModeProvider>
      </body>
    </html>
  );
}
