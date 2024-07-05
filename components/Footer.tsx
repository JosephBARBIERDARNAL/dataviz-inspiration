import Link from "next/link";
import React from "react";
import SocialMediaButtons from "./SocialMediaButtons";

export default function Footer() {
  return (
    <div className="h-24 w-full grid grid-cols-3 gap-1 ">
      <div className="text-sm font-light flex flex-row justify-start items-center">
        <p className="hidden sm:inline">Copyright © dataviz inspiration 2024</p>
      </div>

      <div className="flex flex-row justify-center items-center ">
        <SocialMediaButtons />
      </div>

      <div className="text-sm font-light flex flex-row justify-end items-center">
        <span className="hidden sm:inline">
          <span>A work by </span>
          <Link href="https://www.yan-holtz.com">Yan Holtz</Link>
        </span>
      </div>
    </div>
  );
}
