"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Globe,
  Search,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { HeaderDropdown } from "@/components/shared/header-dropdown";
import { getUserInitial } from "@/utils/user";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UserCircle2 } from "lucide-react";


type Country = {
  code: string;
  name: string;
  flag: string;
};

type Language = {
  code: string;
  label: string;
  shortLabel: string;
  flag: string;
};

const countries: Country[] = [
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

const languages: Language[] = [
  { code: "fr", label: "Français", shortLabel: "Fr", flag: "fr" },
  { code: "en", label: "English", shortLabel: "En", flag: "gb" },
  { code: "ar", label: "العربية", shortLabel: "Ar", flag: "sa" },
];

export default function Header() {
  const params = useParams();
  const pathname = usePathname();

  const currentLocale =
    typeof params?.locale === "string" ? params.locale : "fr";

  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[1]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { user, isLoading } = useAuth();

  const cartCount = 0;

  const selectedLanguage = useMemo(() => {
    return (
      languages.find((language) => language.code === currentLocale) ??
      languages[0]
    );
  }, [currentLocale]);

  function buildLocalePath(locale: string) {
    if (!pathname) return `/${locale}`;

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      return `/${locale}`;
    }

    if (languages.some((language) => language.code === segments[0])) {
      segments[0] = locale;
      return `/${segments.join("/")}`;
    }

    return `/${locale}/${segments.join("/")}`;
  }

  const languageItems = languages.map((language) => ({
    key: language.code,
    label: language.label,
    imageSrc: `https://flagcdn.com/w20/${language.flag}.png`,
    imageAlt: language.label,
    href: buildLocalePath(language.code),
  }));

  const countryItems = countries.map((country) => ({
    key: country.code,
    label: country.name,
    imageSrc: `https://flagcdn.com/w20/${country.flag}.png`,
    imageAlt: `${country.name} flag`,
    onClick: () => setSelectedCountry(country),
  }));

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
            <button
              type="button"
              className="ml-3 text-gray-700 transition hover:text-black"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex min-w-[240px] items-center justify-end gap-4 text-sm text-gray-800">
          {/* Language Dropdown */}
          <HeaderDropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-1 hover:text-black"
              >
                <Globe size={16} />
                <span>{selectedLanguage.shortLabel}</span>
              </button>
            }
            items={languageItems}
            selectedKey={selectedLanguage.code}
            widthClassName="w-[170px]"
          />

          {/* Country Dropdown */}
          <HeaderDropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 hover:text-black"
              >
                <img
                  src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`}
                  alt={`${selectedCountry.code} flag`}
                  className="h-3 w-5 object-cover"
                />
                <span>{selectedCountry.code}</span>
                <ChevronDown size={14} className="transition-transform duration-200" />
              </button>
            }
            items={countryItems}
            selectedKey={selectedCountry.code}
            widthClassName="w-[240px]"
          />

          {/* Cart */}
          <div
            className="relative"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <button type="button" className="relative hover:text-black">
              <ShoppingCart size={20} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {cartCount}
              </span>
            </button>

            {cartCount === 0 && (
              <div
                className={`absolute right-0 top-full z-50 mt-3 w-[270px] rounded-[4px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200 ${isCartOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
                  }`}
              >
                <div className="px-5 pb-5 pt-4">
                  <p className="text-center text-[14px] font-medium uppercase leading-[1.45] text-[#1f2937]">
                    VOTRE PANIER EST VIDE POUR L&apos;INSTANT.
                  </p>

                  <div className="mt-8 flex items-center justify-between text-[16px] font-semibold text-[#1f2937]">
                    <span>TOTAL:</span>
                    <span>0 TND</span>
                  </div>

                  <button
                    type="button"
                    className="mt-3 h-[40px] w-full rounded-[4px] bg-[#5dd3db] text-[13px] font-semibold text-white transition hover:opacity-95"
                  >
                    Passer La Commande
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Account */}
          <Link
            href={user ? `/${currentLocale}/account` : `/${currentLocale}/login`}
            className="group flex items-center gap-2 text-[#111827] transition-colors duration-200 hover:text-[#0c7c88]"
          >
            {user && !isLoading && (
              <span className="font-medium">{user.first_name}</span>
            )}

            {user ? (
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4b6687] text-sm font-semibold text-[#1f2937] transition-colors duration-200 group-hover:border-[#0c7c88] group-hover:text-[#0c7c88]">
                {getUserInitial(user.first_name)}
              </span>
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4b6687] text-[#1f2937] transition-colors duration-200 group-hover:border-[#0c7c88] group-hover:text-[#0c7c88]">
                <UserCircle2 size={18} />
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}