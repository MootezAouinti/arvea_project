import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="w-full">
      <div className="relative h-[280px] w-full md:h-[575px]">
        <Image
          src="/images/hero-banner.jpg"
          alt="Arvea hero banner"
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}