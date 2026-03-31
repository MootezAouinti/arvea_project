import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function OpportunitySection() {
  return (
    <section className="w-full">
      <div className="relative h-[420px] w-full overflow-hidden md:h-[620px]">
        <Image
          src="/images/opportunite.jpg"
          alt="Opportunité Arvea Nature"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-[#58c7c7]/55" />

        
      </div>
    </section>
  );
}