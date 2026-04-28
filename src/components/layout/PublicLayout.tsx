import { ReactNode } from "react";
import { Header } from "./Header";

export const PublicLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-[#fffaf5]">
    <Header />
    {children}
  </div>
);
