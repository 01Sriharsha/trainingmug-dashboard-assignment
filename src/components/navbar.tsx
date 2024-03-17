"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Search from "@/components/search";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="navbar bg-base-100 justify-between items-center text-base">
      <Link href="/" className="mb-2">
        <Image
          src={"/trainingmug.svg"}
          alt="trainingmug"
          height={100}
          width={100}
        />
      </Link>
      <div className="w-full flex justify-between flex-wrap gap-2 md:justify-between items-center px-2">
        <div className="flex items-center gap-5 md:justify-start justify-end">
          <Link
            href="/"
            className={pathname.includes("explore") ? "border-b border-b-primary" : ""}
          >
            Explore
          </Link>
          <Link
            href="/saved"
            className={pathname.includes("saved")  ? "border-b border-b-primary" : ""}
          >
            Saved
          </Link>
        </div>
        <div className="md:w-[40%] lg:w-[30%] hidden md:block">
          <Search />
        </div>
      </div>
    </div>
  );
}
