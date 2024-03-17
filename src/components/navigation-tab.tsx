"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillFilePostFill } from "react-icons/bs";
import { ImFilePicture } from "react-icons/im";

export default function NavigationTab() {
  const pathname = usePathname();
  const prefix = pathname.startsWith("/saved") ? "saved" : "explore";
  const isPictures = pathname.includes("pictures")
  return (
    <div role="tablist" className="tabs tabs-bordered max-w-[300px] mx-auto mb-3">
      <Link
        href={`/${prefix}/posts`}
        role="tab"
        className={`flex items-center gap-1 tab ${!isPictures && 'tab-active'}`}
      >
        <BsFillFilePostFill />
        <span>Posts</span>
      </Link>
      <Link
        href={`/${prefix}/pictures`}
        role="tab"
        className={`flex items-center gap-1 tab ${isPictures && 'tab-active'}`}
      >
        <ImFilePicture />
        <span>Pictures</span>
      </Link>
    </div>
  );
}
