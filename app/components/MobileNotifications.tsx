import { BellIcon } from "@heroicons/react/24/outline";

const MobileNotifications = () => {
  return (
    <button
      type="button"
      className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      <BellIcon aria-hidden="true" className="size-6" />
    </button>
  );
};

export default MobileNotifications;
