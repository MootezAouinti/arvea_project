"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useRef, useState } from "react";
import ProductCard from "./ProductCard";

const bestSellers = [
  {
    id: 1,
    name: "CRÈME ANTI-TACHES",
    price: "3 450 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 2,
    name: "ANTI-MOUSTIQUES",
    price: "800 DZ",
    image: "/images/products/make-up.jpg",
  },
  {
    id: 3,
    name: "CRÈME APAISANTE 100 ML",
    price: "1 300 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 4,
    name: "CRÈME APAISANTE 200 ML",
    price: "2 150 DZ",
    image: "/images/products/make-up.jpg",
  },
  {
    id: 5,
    name: "BB CRÈME",
    price: "3 300 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 6,
    name: "CRÈME ANTI-TACHES",
    price: "3 450 DZ",
    image: "/images/products/make-up.jpg",
  },
  {
    id: 7,
    name: "ANTI-MOUSTIQUES",
    price: "800 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 8,
    name: "CRÈME APAISANTE 100 ML",
    price: "1 300 DZ",
    image: "/images/products/make-up.jpg",
  },
  {
    id: 9,
    name: "CRÈME APAISANTE 200 ML",
    price: "2 150 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 10,
    name: "BB CRÈME",
    price: "3 300 DZ",
    image: "/images/products/test.jpg",
  },
];

const recommended = [
  {
    id: 6,
    name: "SÉRUM HYDRATANT",
    price: "2 950 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 7,
    name: "LOTION DOUCE",
    price: "1 100 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 8,
    name: "GEL APAISANT",
    price: "1 850 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 9,
    name: "SOIN VISAGE",
    price: "2 450 DZ",
    image: "/images/products/test.jpg",
  },
  {
    id: 10,
    name: "EAU MICELLAIRE",
    price: "1 950 DZ",
    image: "/images/products/test.jpg",
  },
];

export default function ProductCarousel() {
  const [activeTab, setActiveTab] = useState<"best" | "recommended">("best");
  const sliderRef = useRef<HTMLDivElement>(null);

  const products = activeTab === "best" ? bestSellers : recommended;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -sliderRef.current.offsetWidth,
    behavior: "smooth",});
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white px-4 pb-10 md:px-6 md:pb-14">
      <div className="mx-auto max-w-[1560px]">
        <div className="mb-5 flex items-center justify-end gap-6">
          <button
            onClick={() => setActiveTab("best")}
            className={`text-sm font-medium transition ${
              activeTab === "best"
                ? "border-b border-[#ff6b6b] pb-1 text-[#ff6b6b]"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Meilleures ventes
          </button>

          <button
            onClick={() => setActiveTab("recommended")}
            className={`text-sm font-medium transition ${
              activeTab === "recommended"
                ? "border-b border-[#ff6b6b] pb-1 text-[#ff6b6b]"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Recommandés
          </button>

          <div className="ml-2 flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:text-black"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={scrollRight}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:text-black"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative">

            <div
        ref={sliderRef}
        className="flex gap-4 overflow-hidden scroll-smooth"
      >
          {products.map((product) => (
          <ProductCard product={product} key={product.id} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}