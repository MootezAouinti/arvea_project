export default function Navbar() {
  const items = [
    { label: "À propos", active: false },
    { label: "Boutique", active: false },
    { label: "Découvrez l’opportunité", active: true },
    { label: "Contact", active: false },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center px-6">
        <ul className="flex items-center gap-2">
          {items.map((item) => (
            <li key={item.label}>
              <button
                className={`relative px-5 py-4 text-[15px] font-medium transition ${
                  item.active
                    ? "rounded-md border border-[#b85c3a] text-[#1f1f1f]"
                    : "text-[#1f1f1f] hover:text-black"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}