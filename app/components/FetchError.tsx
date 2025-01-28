import React from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

interface FetchErrorProps {
  message?: string;
}

const FetchError = ({ message }: FetchErrorProps) => {
  return (
    <div className="block w-full rounded-lg px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6">
      <div className="flex items-center py-1">
        <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default FetchError;
