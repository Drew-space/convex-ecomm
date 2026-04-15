import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { Minus, Plus, Star, Truck } from "lucide-react";
import React from "react";

interface products {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: products) => {
  const { id } = await params;

  const product = await fetchQuery(api.product.getProductById, {
    id: id as Id<"products">,
  });
  return (
    <div className="container mx-auto">
      <div className=" mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={product?.images || []} />

          <div className="md:py-8">
            <span className="text-gray-500">{product?.category}</span>
            <h2 className="text-2xl font-bold">{product?.name}</h2>

            <div className="my-4 flex items-center gap-3">
              <Button size="sm">
                <Star className="h-4 w-4 mr-1" /> 4.2
              </Button>
              <span className="text-sm text-gray-500">56 Ratings</span>
            </div>

            <p className="text-xl font-bold">${product?.price}</p>

            <div className="my-4 flex items-center gap-2 text-gray-500">
              <Truck className="h-5 w-5" />
              <span>2–4 Day Shipping</span>
            </div>

            {/* Quantity */}
            <div className="my-4">
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Minus />
                </Button>
                <span>5</span>
                <Button variant="outline">
                  <Plus />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button>Add To Bag</Button>
              <Button variant="outline">Checkout Now</Button>
            </div>

            <p className="mt-6 text-gray-500">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
