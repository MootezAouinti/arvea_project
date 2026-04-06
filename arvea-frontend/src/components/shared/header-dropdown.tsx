"use client";

import { useState } from "react";
import Link from "next/link";

type DropdownItem = {
  key: string;
  label: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  onClick?: () => void;
};

type HeaderDropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  selectedKey?: string;
  widthClassName?: string;
};

export function HeaderDropdown({
  trigger,
  items,
  selectedKey,
  widthClassName = "w-[200px]",
}: HeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <div>{trigger}</div>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full z-50 mt-2 rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        } ${widthClassName}`}
      >
        {items.map((item) => {
          const content = (
            <div
              className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-50 ${
                selectedKey === item.key ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {item.imageSrc && (
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="h-3 w-5 object-cover"
                />
              )}
              <span>{item.label}</span>
            </div>
          );

          if (item.href) {
            return (
              <Link key={item.key} href={item.href}>
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.key}
              onClick={item.onClick}
              className="w-full text-left"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}