import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section className="w-full bg-[#f5f7fb] py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        
        <h2 className="mb-10 text-4xl font-extrabold uppercase text-black md:text-6xl">
          Qui sommes-nous ?
        </h2>

        {/* SINGLE BIG IMAGE */}
        <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden rounded-md">
          
          <Image
            src="/images/us.jpg"
            alt="Notre histoire"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute  bg-[#58c7c7]/40" />
        </div>
      </div>
    </section>
  );
}