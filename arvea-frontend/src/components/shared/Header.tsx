"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Globe,
  Search,
  ShoppingCart,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";

const countries = [
  { code: "DZ", name: "Algérie", flag: "dz" },
  { code: "TN", name: "Tunisie", flag: "tn" },
  { code: "CI", name: "Côte d'Ivoire", flag: "ci" },
  { code: "BF", name: "Burkina Faso", flag: "bf" },
  { code: "TG", name: "Togo", flag: "tg" },
  { code: "KW", name: "Koweït", flag: "kw" },
  { code: "AE", name: "Émirats arabes unis", flag: "ae" },
  { code: "LY", name: "Libye", flag: "ly" },
  { code: "OM", name: "Sultanat d'Oman", flag: "om" },
  { code: "EG", name: "Égypte", flag: "eg" },
];

export default function Header() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-6">
        {/* Left - Logo */}
        <div className="flex min-w-[160px] items-center">
          <h1 className="text-4xl font-light tracking-wide text-[#1f1f1f]">
            ARVEA
          </h1>
        </div>

        {/* Center - Search */}
        <div className="flex flex-1 justify-center">
          <div className="flex w-full max-w-[480px] items-center rounded-md border border-gray-300 bg-white px-4 py-2">
            <input
              type="text"
              placeholder="Recherche des produits ici ..."
              className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button className="ml-3 text-gray-700 transition hover:text-black">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex min-w-[240px] items-center justify-end gap-4 text-sm text-gray-800">
          <button className="flex items-center gap-1 hover:text-black">
            <Globe size={16} />
            <span>Fr</span>
          </button>

          {/* Country Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsCountryOpen((prev) => !prev)}
              className="flex items-center gap-2 hover:text-black"
            >
              <img
                src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`}
                alt={`${selectedCountry.code} flag`}
                className="h-3 w-5 object-cover"
              />
              <span>{selectedCountry.code}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  isCountryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCountryOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-[240px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                {countries.map((country) => {
                  const isSelected = selectedCountry.code === country.code;

                  return (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsCountryOpen(false);
                      }}
                      className="flex w-full items-center justify-between border-b border-gray-200 px-3 py-3 text-left text-sm hover:bg-gray-50 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/w20/${country.flag}.png`}
                          alt={`${country.name} flag`}
                          className="h-3 w-5 object-cover"
                        />
                        <span>{country.name}</span>
                      </div>

                      {isSelected && (
                        <Check size={16} className="text-gray-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button className="relative hover:text-black">
            <ShoppingCart size={20} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              0
            </span>
          </button>

          <Link
              href="/fr/account"
              className="flex items-center gap-2 hover:text-black"
            >
              <span className="font-medium">Mootez</span>
              <UserCircle2 size={24} className="text-gray-500" />
            </Link>
        </div>
      </div>
    </header>
  );
}