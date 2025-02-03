"use client";

import React, { Fragment, useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

import { Avatar } from "@mui/material";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import useMe from "@/app/hooks/useMe";
import getUser from "@/app/lib/get-user";

export const solutions = [
  {
    name: "나의 프로필",
    href: "##",
  },
  {
    name: "나의 주문",
    href: "##",
  },
  {
    name: "판매자 계정 신청하기",
    href: "##",
  },
  // {
  //   name: "로그아웃",
  //   href: "logout",
  // },
];

const ProfileDropDown = () => {
  const { meGql, loading } = useMe();
  console.log("meGql", meGql);
  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const logoutHandler = () => {
    window.location.reload();
  };

  return (
    <div className="relative flex justify-center items-center gap-6 px-4">
      {login ? (
        <Popover className="">
          {({ open }) => (
            <>
              <PopoverButton
                className={`
                ${open ? "text-white" : "text-white/90"}
                flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  className="rounded-full"
                  src={"https://avatars.githubusercontent.com/u/69073390?v=4"}
                />
                {/*<ChevronDownIcon*/}
                {/*  className={`${open ? "text-gray-300" : "text-gray-300/70"}*/}
                {/*  -mr-1 size-5 text-gray-400`}*/}
                {/*  aria-hidden="true"*/}
                {/*/>*/}
              </PopoverButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute right-0 z-10 mt-6 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                    <p className="text-sm">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-900">
                      tom@example.com
                    </p>
                  </div>
                  <div className="">
                    {solutions.map((solution) => (
                      <Link
                        key={solution.name}
                        href={solution.href}
                        // onClick={() =>
                        //   solution.href === "logout" && logoutHandler()
                        // }
                      >
                        <div className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                          <p className="text-sm font-medium text-gray-900">
                            {solution.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <PopoverButton className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                      로그 아웃
                    </PopoverButton>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      ) : (
        <div className="px-3">
          <Link href="/auth/login">
            <CgProfile
              onClick={() => setOpen(!open)}
              className="text-3xl cursor-pointer"
            />
          </Link>
          {/*{open && (*/}
          {/*  <div className="w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000027]">*/}
          {/*    <Login />*/}
          {/*  </div>*/}
          {/*)}    */}
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
