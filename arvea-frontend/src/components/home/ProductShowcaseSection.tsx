"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/home/ProductCard";
import type { Product } from "@/types/product";

export type ProductShowcaseSectionProps = {
  title: string;
  tabs: string[];
  products: Product[];
  promoImage?: string;
  showPromo?: boolean;
};

export default function ProductShowcaseSection({
  title,
  tabs,
  products,
  promoImage,
  showPromo = false,
}: ProductShowcaseSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0] ?? "Tout");
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: -(slider.clientWidth / 4),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: slider.clientWidth / 4,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      const step = slider.clientWidth / 4;

      if (slider.scrollLeft + step >= maxScrollLeft) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: step,
          behavior: "smooth",
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto max-w-[1560px]">
        {showPromo && promoImage && (
          <div className="relative mb-10 h-[260px] w-full overflow-hidden md:h-[460px]">
            <Image
              src={promoImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mb-5 flex items-center justify-between bg-[#f3f5f8] px-6 py-4">
          <div className="relative">
            <div className="absolute -top-[8px] left-0 h-[3px] w-[140px] bg-black" />
            <h2 className="text-[22px] font-extrabold uppercase tracking-tight text-black md:text-[24px]">
              {title}
            </h2>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-[14px] font-extrabold uppercase text-black"
          >
            En savoir plus
            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-[15px] font-medium transition ${
                  activeTab === tab
                    ? "text-[#23b7c6] underline underline-offset-4"
                    : "text-[#4b5563] hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition hover:text-black"
              aria-label={`Faire défiler ${title} vers la gauche`}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={scrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition hover:text-black"
              aria-label={`Faire défiler ${title} vers la droite`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-hidden scroll-smooth"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}