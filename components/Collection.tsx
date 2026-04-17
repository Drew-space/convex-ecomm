// import ProductPage from "@/app/(main)/product/page";
// import { api } from "@/convex/_generated/api";
// import { ConvexHttpClient } from "convex/browser";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Collection = async () => {
//   const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
//   const [men, women, teens] = await Promise.all([
//     convex.query(api.product.getByCategory, { category: "Men" }),
//     convex.query(api.product.getByCategory, { category: "Women" }),
//     convex.query(api.product.getByCategory, { category: "Teens" }),
//   ]);

//   const products = [...men, ...women, ...teens];
//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <div className=" flex justify-between items-center">
//           <h2 className=" text-2xl font-bold tracking-tight text-gray-900 ">
//             Our Newest Products
//           </h2>

//           <Link
//             href="/product"
//             className="text-primary flex items-center gap-x-1"
//           >
//             See All{" "}
//             <span>
//               <ArrowRight />
//             </span>
//           </Link>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 xl:gap-x-8">
//           <ProductPage products={...products} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;

// components/Collection.tsx (or wherever it lives)
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Collection = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const [men, women, teens] = await Promise.all([
    convex.query(api.product.getByCategory, { category: "Men" }),
    convex.query(api.product.getByCategory, { category: "Women" }),
    convex.query(api.product.getByCategory, { category: "Teens" }),
  ]);

  const products = [...men, ...women, ...teens];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest Products
          </h2>
          <Link
            href="/product"
            className="text-primary flex items-center gap-x-1"
          >
            See All <ArrowRight />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 xl:gap-x-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
