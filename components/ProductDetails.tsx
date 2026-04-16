// "use client";

// import BackButton from "@/components/BackButton";
// import ImageGallery from "@/components/ImageGallery";
// import { Button } from "@/components/ui/button";
// import { Minus, Plus, Star, Truck } from "lucide-react";
// import { useState } from "react";
// import { useCartStore } from "@/app/hooks/use-cart-store";
// import { useRouter } from "next/navigation";

// export default function ProductDetails({ product }: any) {
//   const router = useRouter();
//   const addItem = useCartStore((s) => s.addItem);

//   const [quantity, setQuantity] = useState(1);

//   const isOutOfStock = product.stock === 0;

//   const increment = () => setQuantity((q) => Math.min(product.stock, q + 1));
//   const decrement = () => setQuantity((q) => Math.max(1, q - 1));

//   const handleAddToCart = () => {
//     if (product.stock === 0) return;

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
//     router.push("/checkout");
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

//             {isOutOfStock ? (
//               <Button disabled className="w-full">
//                 Out of Stock
//               </Button>
//             ) : (
//               <>
//                 {/* Quantity selector */}
//                 <div className="flex items-center gap-2 my-4">
//                   <Button variant="outline" onClick={decrement}>
//                     <Minus />
//                   </Button>
//                   <span className="w-8 text-center font-semibold">
//                     {quantity}
//                   </span>
//                   <Button variant="outline" onClick={increment}>
//                     <Plus />
//                   </Button>
//                 </div>

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
// }
