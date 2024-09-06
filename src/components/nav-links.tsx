"use client";

import Link from "next/link";
import {
  ChartBarIcon,
  PhoneIcon,
  PuzzlePieceIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

const NAV_LINKS = [
  {
    name: "listings",
    href: "/listings",
    icon: ChartBarIcon,
  },
  {
    name: "create listing",
    href: "/create",
    icon: PhoneIcon,
  },
  {
    name: "my listings",
    href: "/view-listings",
    icon: PuzzlePieceIcon,
  },
  {
    name: "my bids",
    href: "/bids",
    icon: Cog6ToothIcon,
  },
  {
    name: "sign out",
    href: "#",
    icon: Cog6ToothIcon,
  },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col h-full gap-4">
      {NAV_LINKS.map((link, idx) => {
        const LinkIcon = link.icon;
        if (idx === NAV_LINKS.length - 1)
          return (
            <SignOutButton>
              <ArrowLeftStartOnRectangleIcon />
            </SignOutButton>
          );
        return (
          <Link
            href={link.href}
            key={link.href}
            className={clsx(
              "p-1 text-white",
              {
                "bg-accent rounded-md text-accent-foreground":
                  pathname === link.href,
              },
              { "mt-auto": idx === NAV_LINKS.length - 1 }
            )}
          >
            <LinkIcon className="w-[25px] h-[25px]" />
          </Link>
        );
      })}
    </ul>
  );
}
export default NavLinks;
