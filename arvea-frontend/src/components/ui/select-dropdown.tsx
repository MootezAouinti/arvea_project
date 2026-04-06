"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export type SelectDropdownOption = {
  value: string;
  label: string;
  shortLabel?: string;
  flag: string;
};

type SelectDropdownProps = {
  options: SelectDropdownOption[];
  selectedOption: SelectDropdownOption;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: SelectDropdownOption) => void;
  triggerClassName?: string;
  menuClassName?: string;
  showShortLabelInTrigger?: boolean;
};

export function SelectDropdown({
  options,
  selectedOption,
  isOpen,
  onToggle,
  onSelect,
  triggerClassName = "",
  menuClassName = "",
  showShortLabelInTrigger = false,
}: SelectDropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-2 ${triggerClassName}`}
      >
        <Image
          src={`https://flagcdn.com/w40/${selectedOption.flag}.png`}
          alt={selectedOption.label}
          width={20}
          height={15}
          className="h-[15px] w-[20px] rounded-[2px] object-cover"
        />

        <span className="text-sm text-[#1f1f1f]">
          {showShortLabelInTrigger && selectedOption.shortLabel
            ? selectedOption.shortLabel
            : selectedOption.label}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 top-full z-50 mt-2 min-w-[220px] rounded-md border border-gray-200 bg-white py-2 shadow-lg ${menuClassName}`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option)}
              className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-50"
            >
              <Image
                src={`https://flagcdn.com/w40/${option.flag}.png`}
                alt={option.label}
                width={20}
                height={15}
                className="h-[15px] w-[20px] rounded-[2px] object-cover"
              />

              <span className="text-sm text-[#1f1f1f]">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}