"use client";

import BackButton from "@/components/BackButton";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { useQuery } from "convex/react";
import { Minus, Plus, Star, Truck } from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = ({ params }: PageProps) => {
  const { id } = use(params);
  const router = useRouter();

  // Live subscription — UI updates automatically if stock hits 0
  const product = useQuery(api.product.getProductById, {
    id: id as Id<"products">,
  });

  const [quantity, setQuantity] = useState(1);
  const { addItem, setBuyNowItem } = useCartStore();

  if (product === undefined)
    return <div className="p-8 text-center">Loading...</div>;
  if (product === null)
    return <div className="p-8 text-center">Product not found.</div>;

  const isOutOfStock = product.stock <= 0;

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(product.stock, q + 1));

  // Adds to cart then opens cart modal
  const handleAddToCart = () => {
    addItem(
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock,
        category: product.category,
      },
      quantity,
    );
  };

  // Sets a single buy-now item, bypasses cart, goes straight to checkout
  const handleCheckoutNow = () => {
    setBuyNowItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      stock: product.stock,
      category: product.category,
      quantity,
    });
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <BackButton />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={product.images} />

          <div className="md:py-8">
            <span className="text-gray-500">{product.category}</span>
            <h2 className="text-2xl font-bold">{product.name}</h2>

            <div className="my-4 flex items-center gap-3">
              <Button size="sm">
                <Star className="h-4 w-4 mr-1" /> 4.2
              </Button>
              <span className="text-sm text-gray-500">56 Ratings</span>
            </div>

            <p className="text-xl font-bold">
              ₦{product.price.toLocaleString()}
            </p>

            <div className="my-4 flex items-center gap-2 text-gray-500">
              <Truck className="h-5 w-5" />
              <span>2–4 Day Shipping</span>
            </div>

            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-amber-500 text-sm mb-2">
                Only {product.stock} left in stock!
              </p>
            )}

            {isOutOfStock ? (
              // Only this button shows when out of stock — nothing else
              <Button disabled className="w-full opacity-50 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <>
                {/* Quantity selector */}
                <div className="my-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={decrement}
                    disabled={quantity <= 1}
                  >
                    <Minus />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    onClick={increment}
                    disabled={quantity >= product.stock}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddToCart}>Add To Bag</Button>
                  <Button variant="outline" onClick={handleCheckoutNow}>
                    Checkout Now
                  </Button>
                </div>
              </>
            )}

            <p className="mt-6 text-gray-500">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
