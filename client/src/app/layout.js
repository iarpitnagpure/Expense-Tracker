import { Inter } from "next/font/google";
import ReduxProvider from "./redux/store/storeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
  description: "App that tracker your daily expense",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReduxProvider>{children}
        </ReduxProvider>
      </body>
    </html>
  );
}
