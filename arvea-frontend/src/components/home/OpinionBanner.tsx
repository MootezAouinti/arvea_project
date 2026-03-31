import { ArrowUpRight } from "lucide-react";

export default function OpinionBanner() {
  return (
    <section className="w-full border-t border-[#dbe5f2] bg-[#f8fbff] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto flex max-w-[1560px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-3xl font-extrabold uppercase text-black md:text-5xl">
            Votre opinion compte pour nous !
          </h2>
          <p className="mt-4 text-base text-[#444] md:text-xl">
            N’hésitez pas à nous donner votre avis
          </p>
        </div>

        <button className="inline-flex items-center gap-3 bg-[#32c6d3] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90 md:text-base">
          Votre avis
          <ArrowUpRight size={20} />
        </button>
      </div>
    </section>
  );
}