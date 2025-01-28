import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

interface NotificationsProps {
  className?: string;
}

const Notifications = ({ className }: NotificationsProps) => {
  return (
    <div className="rounded-full flex items-center justify-center gap-6 px-2">
      <button
        type="button"
        className={clsx(
          "rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        )}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="size-6" />
      </button>
    </div>
  );
};

export default Notifications;
