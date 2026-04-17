import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { CircleArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ConvexHttpClient } from "convex/browser";
import Link from "next/link";

const ProductsPage = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const [men, women, teens] = await Promise.all([
    convex.query(api.product.getByCategory, { category: "Men" }),
    convex.query(api.product.getByCategory, { category: "Women" }),
    convex.query(api.product.getByCategory, { category: "Teens" }),
  ]);

  const products = [...men, ...women, ...teens];

  return (
    <div className="mx-auto max-w-7xl px-4 ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="md:hidden">
          <Button className="bg-primary  text-white">
            <Link className="flex items-center gap-2" href={"/"}>
              <HugeiconsIcon icon={CircleArrowLeft02Icon} />
              Go back
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
