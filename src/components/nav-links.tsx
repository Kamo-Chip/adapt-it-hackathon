"use client";

import { createClient } from "@/utils/client";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import {
  ArrowLeftStartOnRectangleIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TooltipWrapper from "./wrappers/tooltip-wrapper";

const TRUCKER_NAV_LINKS = [
  {
    name: "My Listings",
    href: "/my-listings",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Create Listing",
    href: "/create",
    icon: ClipboardDocumentIcon,
  },
  {
    name: "Open Bids",
    href: "/open-bids",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Sign out",
    href: "#",
    icon: Cog6ToothIcon,
  },
];

const CONSIGNEE_NAV_LINKS = [
  {
    name: "Listings",
    href: "/listings",
    icon: MapIcon,
  },
  {
    name: "My Bids",
    href: "/my-bids",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Sign out",
    href: "#",
    icon: Cog6ToothIcon,
  },
];

function NavLinks({ role }: { role: string | undefined }) {
  const pathname = usePathname();

  const NAV_LINKS =
    role === "business"
      ? CONSIGNEE_NAV_LINKS
      : role === "transporter"
      ? TRUCKER_NAV_LINKS
      : [];
  return (
    <ul className="flex flex-col h-full w-full gap-4">
      {NAV_LINKS.map((link, idx) => {
        const LinkIcon = link.icon;
        if (idx === NAV_LINKS.length - 1)
          return (
            <TooltipWrapper
              key={link.href}
              triggerContent={
                <SignOutButton key={link.href}>
                  <ArrowLeftStartOnRectangleIcon className="mt-auto cursor-pointer w-6 h-6" />
                </SignOutButton>
              }
              tooltipContent={"Sign out"}
            />
          );
        return (
          <TooltipWrapper
            key={link.href}
            triggerContent={
              <Link
                href={link.href}
                key={link.href}
                className={clsx("p-1 text-white flex gap-4", {
                  "bg-gray-400 rounded-md text-accent-foreground":
                    pathname === link.href,
                })}
              >
                <LinkIcon className="w-6 h-6" />
                <span>{link.name}</span>
              </Link>
            }
            tooltipContent={link.name}
          />
        );
      })}
    </ul>
  );
}
export default NavLinks;
