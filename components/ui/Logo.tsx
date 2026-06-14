import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/logo.webp"
        alt={`${COMPANY.name} logo`}
        width={1024}
        height={545}
        priority
        unoptimized
        className="h-14 w-auto sm:h-16 lg:h-[4.5rem]"
      />
    </Link>
  );
}
