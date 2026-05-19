"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

export function BrandHomeLink() {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "/");
  };

  return (
    <Link className="brand" href="/#top" aria-label="CQuest home" onClick={handleClick}>
      <Image
        src="/assets/img/logo/logo-cquest.png"
        alt="CQuest"
        width={172}
        height={41}
        priority
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
  );
}
