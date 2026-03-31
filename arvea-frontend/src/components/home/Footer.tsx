export default function Footer() {
  const items = [
    {
      title: "Garantie de confidentialité",
      description: "Données personnelles 100% sécurisées",
    },
    {
      title: "Paiement 100% sécurisé",
      description: "Cartes de paiement acceptées",
    },
    {
      title: "Satisfait ou remboursé",
      description: "La qualité, notre engagement",
    },
    {
      title: "Service clients",
      description: "Assistance 24h/24 et 7j/7",
    },
  ];

  return (
    <footer className="w-full bg-[#243240] px-4 py-10 text-white md:px-6 md:py-12">
      <div className="mx-auto grid max-w-[1560px] grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="border-b border-white/10 pb-6 md:border-b-0 md:border-r md:border-white/10 md:pb-0 md:pr-6"
          >
            <h3 className="mb-3 text-lg font-semibold md:text-xl">
              {item.title}
            </h3>
            <p className="text-sm leading-7 text-white/80 md:text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </footer>
  );
}