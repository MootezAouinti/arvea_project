import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "COSMÉTIQUE",
    image: "/images/categories/cos_nat.jpg",
  },
  {
    title: "PARFUMS",
    image: "/images/categories/test.jpg",
  },
  {
    title: "MAQUILLAGE",
    image: "/images/categories/maq.jpg",
  },
  {
    title: "COMPLÉMENTS",
    image: "/images/categories/com_ali.jpg",
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full bg-white px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1560px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-[20px] bg-gray-100"
            >
              <div className="relative h-[320px] w-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5">
                <h3 className="text-2xl font-semibold text-white">
                  {category.title}
                </h3>

                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black transition hover:bg-white">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}