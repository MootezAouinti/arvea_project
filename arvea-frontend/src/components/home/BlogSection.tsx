import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const posts = [
  {
    id: 1,
    date: "21 novembre 2024",
    title: "La Beauté en 2024 : entre Diversité, Valeurs et Innovations",
    description:
      "Au fil des temps, les codes de la beauté ont évolué vers plus de valeurs et d’authenticité",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    date: "15 novembre 2024",
    title: "Nos 10 recommandations pour réussir votre projet MLM",
    description:
      "Le MLM serait la plus puissante industrie au monde en terme de changement et de réussite",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    date: "Le 26 septembre 2024",
    title: "Atteignez votre liberté financière durable avec ARVEA",
    description:
      "Dans un monde où les finances tiennent de plus en plus les rênes du pouvoir, ARVEA1 considère...",
    image: "/images/blog3.jpg",
  },
];

export default function BlogSection() {
  return (
    <section className="w-full bg-[#f5f7fb] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1560px]">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-extrabold uppercase text-black md:text-5xl">
            Blog
          </h2>

          <button className="inline-flex items-center gap-2 text-2xl font-bold text-black">
            En savoir plus
            <ArrowUpRight size={26} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id}>
              <div className="relative mb-5 h-[240px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="mb-4 text-xs text-[#6b7280] md:text-sm">{post.date}</p>

              <h3 className="mb-4 text-lg font-medium leading-8 text-[#333] md:text-2xl">
                {post.title}
              </h3>

              <p className="mb-5 text-sm leading-7 text-[#6b7280] md:text-base">
                {post.description}
              </p>

              <button className="inline-flex items-center gap-2 text-sm font-bold text-black md:text-lg">
                En savoir plus
                <ArrowRight size={18} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}