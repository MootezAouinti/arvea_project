import { ArrowUpRight } from "lucide-react";

export default function WellnessIntro() {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto grid max-w-[1560px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="max-w-[700px] text-4xl font-extrabold uppercase leading-tight tracking-tight text-black md:text-5xl">
            Oser le bien-être au quotidien
          </h2>
        </div>

        <div className="flex flex-col justify-start">
          <p className="max-w-[720px] text-base leading-8 text-black">
            Le bien-être et la beauté sont deux notions très intimement liées
            auxquelles ARVEA Nature a dédié toutes ses recherches et innovations.
            À base d’ingrédients naturels ou d’origine naturelle, tous nos
            produits seront votre meilleur allié pour un quotidien plus sain et
            plus agréable.
          </p>

          <button className="mt-6 inline-flex w-fit items-center gap-2 border-b border-black pb-1 text-sm font-bold uppercase tracking-wide text-black">
            En savoir plus
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}