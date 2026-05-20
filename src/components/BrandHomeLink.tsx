"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

export function BrandHomeLink() {
  const pathname = usePathname();
  const isV2 = pathname === "/v2";
  const homePath = isV2 ? "/v2" : "/";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/" && !isV2) {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", homePath);
  };

  return (
    <Link className="brand" href={`${homePath}#top`} aria-label="Inicio de CQuest" onClick={handleClick}>
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
