"use client";

import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { DisclosureButton } from "@headlessui/react";
import MobileNotifications from "@/app/components/MobileNotifications";
import { solutions } from "@/app/components/ProfileDropDown";

const MobileProfileDropDown = () => {
  const [login, setLogin] = useState(false);
  const logoutHandler = () => {
    window.location.reload();
  };
  return (
    <>
      {!login ? (
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-4">
            <div className="shrink-0">
              <Avatar
                sx={{ width: 30, height: 30 }}
                className="rounded-full"
                src={"https://avatars.githubusercontent.com/u/69073390?v=4"}
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                Signed in as
              </div>
              <div className="truncate text-sm font-medium text-gray-500">
                tom@example.com
              </div>
            </div>
            <MobileNotifications />
          </div>
          <div className="mt-3 space-y-1">
            {solutions.map((solution, index) => (
              <>
                <DisclosureButton
                  key={index}
                  as="a"
                  href={solution.href}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  {solution.name}
                </DisclosureButton>
              </>
            ))}
            <DisclosureButton
              as="a"
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              로그 아웃
            </DisclosureButton>
          </div>
        </div>
      ) : (
        <div className="px-3">
          <CgProfile className="text-3xl cursor-pointer" />
        </div>
      )}
    </>
  );
};

export default MobileProfileDropDown;
