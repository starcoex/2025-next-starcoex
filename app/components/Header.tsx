"use client";

import { Logo } from "@/app/components/Logo";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  PlusGrid,
  PlusGridItem,
  PlusGridRow,
} from "@/app/components/Plus-grid";
import Link from "next/link";
import ProfileDropDown from "@/app/components/ProfileDropDown";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Notifications from "@/app/components/Notifications";
import MobileProfileDropDown from "@/app/components/MobileProfileDropDown";

const links = [
  { href: "/company", label: "소개" },
  { href: "/car-wash", label: "세차서비스" },
  { href: "/blog", label: "블로그" },
  { href: "/contact", label: "문의하기" },
  // { href: "/login", label: "로그인" },
];

const DesktopNav = () => {
  return (
    <nav className="relative hidden lg:flex">
      {links.map((link) => (
        <PlusGridItem key={link.href} className="relative flex">
          <Link
            href={link.href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]"
          >
            {link.label}
          </Link>
        </PlusGridItem>
      ))}
      <PlusGridItem className="relative flex">
        <Notifications />
      </PlusGridItem>
      <PlusGridItem className="relative flex">
        <ProfileDropDown />
      </PlusGridItem>
    </nav>
  );
};

const MobileNavButton = () => {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  );
};

const MobileNav = () => {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-medium text-gray-950">
              {label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
            rotateX: { duration: 0.3, delay: 5 * 0.1 },
          }}
        >
          <MobileProfileDropDown />
        </motion.div>
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
      </div>
    </DisclosurePanel>
  );
};

const Header = () => {
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <Logo className="h-9" />
              </Link>
            </PlusGridItem>
            <div className="relative hidden items-center py-3 lg:flex">
              <span className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30">
                순간의 이익을 위해 미래를 팔지 않겠습니다.
              </span>
            </div>
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  );
};

export default Header;
