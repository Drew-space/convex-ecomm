"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Status badge colors and icons
const STATUS = {
  paid: {
    label: "Paid",
    icon: CheckCircle,
    color: "text-green-600 bg-green-50",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-50",
  },
  failed: { label: "Failed", icon: XCircle, color: "text-red-600 bg-red-50" },
};

export default function OrdersPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  // Live subscription — new orders appear without refreshing
  const orders = useQuery(
    api.orders.getByClerkId,
    user ? { clerkId: user.id } : "skip", // "skip" pauses query until user loads
  );

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Please sign in to view your orders.</p>
      </div>
    );
  }

  if (!orders) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-400">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <p className="font-medium">
            Payment successful! Your order has been placed.
          </p>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No orders yet.</p>
          <p className="text-sm mt-1">
            Start shopping to see your orders here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const status = STATUS[order.status];
            const StatusIcon = status.icon;
            const date = new Date(order.createdAt).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <div key={order._id} className="border rounded-2xl p-6 space-y-4">
                {/* Order header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Order placed {date}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">
                      Ref: {order.paystackReference}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${status.color}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {status.label}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delivery address */}
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-800 mb-1">
                    Delivery To
                  </p>
                  <p>{order.deliveryAddress.fullName}</p>
                  <p>
                    {order.deliveryAddress.street}, {order.deliveryAddress.city}
                  </p>
                  <p>{order.deliveryAddress.state}</p>
                  <p>{order.deliveryAddress.phone}</p>
                </div>

                {/* Order total */}
                <div className="flex justify-between font-bold border-t pt-4">
                  <span>Total</span>
                  <span>₦{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
