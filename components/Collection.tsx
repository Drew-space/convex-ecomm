import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <div className=" flex justify-between items-center">
          <h2 className=" text-2xl font-bold tracking-tight text-gray-900 ">
            Our Newest Products
          </h2>

          <Link href="/all" className="text-primary flex items-center gap-x-1">
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 xl:gap-x-8">
          {products.slice(0, 4).map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={``}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full "
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
              <div className=" mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={``}>{product.name}</Link>
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
