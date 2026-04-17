// import Image from "next/image";
// import Link from "next/link";

// import { api } from "@/convex/_generated/api";
// import { ConvexHttpClient } from "convex/browser";

// const ProductPage = async () => {
//   const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

//   const allProducts = await convex.query(api.product.getAllProcucts);

//   return (
//     <div>
//       <div className="bg-white ">
//         <div className="mx-auto max-w-2xl   px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//               Our Products
//             </h2>
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 xl:gap-x-8">
//             {allProducts.map((product) => (
//               <div key={product._id} className="group relative">
//                 <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
//                   <Link href={`/product/${product._id}`}>
//                     <Image
//                       src={product.imageUrl}
//                       alt={product.name}
//                       width={300}
//                       height={300}
//                       className="w-full h-full object-cover"
//                     />
//                   </Link>
//                 </div>

//                 <div className="mt-4 flex justify-between">
//                   <div>
//                     <h3 className="text-sm text-gray-700">
//                       <Link href={`/product/${product._id}`}>
//                         {product.name}
//                       </Link>
//                     </h3>

//                     <p className="mt-1 text-sm text-gray-500">
//                       {product.category}
//                     </p>
//                   </div>

//                   <p className="text-sm font-medium text-gray-900">
//                     ₦{product.price.toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// "use client";

// import BackButton from "@/components/BackButton";
// import ImageGallery from "@/components/ImageGallery";
// import { Button } from "@/components/ui/button";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";

// import { useQuery } from "convex/react";
// import { Minus, Plus, Star, Truck } from "lucide-react";
// import { use, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCartStore } from "@/app/hooks/use-cart-store";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// const ProductPage = ({ params }: PageProps) => {
//   const { id } = use(params); // unwrap the promise in client component
//   const router = useRouter();

//   // useQuery keeps this live — if stock hits 0 while user is on page, UI updates
//   const product = useQuery(api.product.getProductById, {
//     id: id as Id<"products">,
//   });

//   const [quantity, setQuantity] = useState(1);
//   const addItem = useCartStore((s) => s.addItem);

//   if (!product) return <div className="p-8 text-center">Loading...</div>;

//   const isOutOfStock = product.stock === 0;

//   const decrement = () => setQuantity((q) => Math.max(1, q - 1));
//   const increment = () => setQuantity((q) => Math.min(product.stock, q + 1)); // can't go above stock

//   const handleAddToCart = () => {
//     addItem(
//       {
//         productId: product._id,
//         name: product.name,
//         price: product.price,
//         imageUrl: product.imageUrl,
//         stock: product.stock,
//         category: product.category,
//       },
//       quantity,
//     );
//   };

//   const handleCheckoutNow = () => {
//     handleAddToCart();
//     router.push("/checkout"); // adjust to your checkout route
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="mx-auto max-w-7xl px-4 md:px-8">
//         <BackButton />
//       </div>

//       <div className="mx-auto max-w-7xl px-4 md:px-8">
//         <div className="grid gap-8 md:grid-cols-2">
//           <ImageGallery images={product.images} />

//           <div className="md:py-8">
//             <span className="text-gray-500">{product.category}</span>
//             <h2 className="text-2xl font-bold">{product.name}</h2>

//             <div className="my-4 flex items-center gap-3">
//               <Button size="sm">
//                 <Star className="h-4 w-4 mr-1" /> 4.2
//               </Button>
//               <span className="text-sm text-gray-500">56 Ratings</span>
//             </div>

//             <p className="text-xl font-bold">
//               ₦{product.price.toLocaleString()}
//             </p>

//             <div className="my-4 flex items-center gap-2 text-gray-500">
//               <Truck className="h-5 w-5" />
//               <span>2–4 Day Shipping</span>
//             </div>

//             {/* Low stock warning */}
//             {product.stock > 0 && product.stock <= 5 && (
//               <p className="text-amber-500 text-sm mb-2">
//                 Only {product.stock} left in stock!
//               </p>
//             )}

//             {isOutOfStock ? (
//               // Out of stock — single disabled button, quantity selector hidden
//               <Button disabled className="w-full opacity-50 cursor-not-allowed">
//                 Out of Stock
//               </Button>
//             ) : (
//               <>
//                 {/* Quantity selector */}
//                 <div className="my-4 flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     onClick={decrement}
//                     disabled={quantity <= 1}
//                   >
//                     <Minus />
//                   </Button>
//                   <span className="w-8 text-center font-semibold">
//                     {quantity}
//                   </span>
//                   <Button
//                     variant="outline"
//                     onClick={increment}
//                     disabled={quantity >= product.stock}
//                   >
//                     <Plus />
//                   </Button>
//                 </div>

//                 {/* Action buttons */}
//                 <div className="flex gap-2">
//                   <Button onClick={handleAddToCart}>Add To Bag</Button>
//                   <Button variant="outline" onClick={handleCheckoutNow}>
//                     Checkout Now
//                   </Button>
//                 </div>
//               </>
//             )}

//             <p className="mt-6 text-gray-500">{product.description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// import Link from 'next/link';
// import React from 'react'

// const ProductPage = () => {
//   return (
//     <div>
//       {products.slice(0, 4).map((product) => (
//         <div key={product._id} className="group relative">
//           <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
//             <Link href={`product/${product._id}`}>
//               <Image\
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-full h-full object-center object-cover lg:w-full lg:h-full "
//                 width={300}
//                 height={300}
//               />
//             </Link>
//           </div>
//           <div className=" mt-4 flex justify-between">
//             <div>
//               <h3 className="text-sm text-gray-700">
//                 <Link href={``}>{product.name}</Link>
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">{product.category}</p>
//             </div>
//             <p className="text-sm font-medium text-gray-900">
//               ₦{product.price.toLocaleString()}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductPage

// app/(main)/product/page.tsx
import ProductCard from "@/components/ProductCard";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const ProductsPage = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const [men, women, teens] = await Promise.all([
    convex.query(api.product.getByCategory, { category: "Men" }),
    convex.query(api.product.getByCategory, { category: "Women" }),
    convex.query(api.product.getByCategory, { category: "Teens" }),
  ]);

  const products = [...men, ...women, ...teens];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
