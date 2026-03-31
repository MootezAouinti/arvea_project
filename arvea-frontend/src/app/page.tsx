

import { Header, Navbar } from "@/components/shared";
import { AboutUsSection, BlogSection, CategoryGrid, Footer, HeroBanner, OpinionBanner, OpportunitySection, ProductCarousel, ProductShowcaseSection, WellnessIntro } from "@/components/home";
import { productSections } from "@/utils/staticData";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navbar />
      <HeroBanner />
      <CategoryGrid />
      <WellnessIntro />
      <ProductCarousel />

      {productSections.map((section) => (
        <ProductShowcaseSection
          key={section.title}
          title={section.title}
          tabs={section.tabs}
          products={section.products}
        />
      ))}

      <OpportunitySection />
      <AboutUsSection />
      <BlogSection />
      <OpinionBanner />
      <Footer />
    </main>
  );
}