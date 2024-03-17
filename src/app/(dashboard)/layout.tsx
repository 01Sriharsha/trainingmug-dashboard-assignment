import Navbar from "@/components/navbar";
import NavigationTab from "@/components/navigation-tab";
import Search from "@/components/search";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <Navbar />
        <div className="flex justify-center md:hidden w-full mb-3">
          <Search />
        </div>
        <NavigationTab />
        {children}
      </div>
    </>
  );
}
