import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-1/4 flex-shrink-0">
      <div className="overflow-hidden rounded-[6px] border border-[#e5e7eb] bg-white">
        <div className="relative h-[360px] w-full overflow-hidden bg-[#f5f5f5] md:h-[420px]">
          {product.badge && (
            <div className="absolute right-2 top-2 z-10 bg-[#ff5a5f] px-2 py-1 text-[10px] font-bold uppercase text-white">
              {product.badge}
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />

          <button
            type="button"
            className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-[14px] uppercase text-[#697586]">
          {product.name}
        </h3>
        <p className="mt-3 text-[16px] font-bold text-black">
          {product.price}
        </p>
      </div>
    </div>
  );
}