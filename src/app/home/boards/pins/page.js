import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSavedPins } from "@/lib/services/pin.service";
import React from "react";

async function PinsPage() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-semibold text-gray-600">
          Please sign in to view your saved pins.
        </h1>
      </div>
    );
  }

  const pins = await getSavedPins(user.id);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Your Saved Pins</h1>
      {pins.length === 0 ? (
        <p className="text-gray-500 font-medium">
          You haven&apos;t saved any pins yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {pins.map((pin) => (
            <div
              key={pin._id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={pin.imageSecureUrl || pin.image}
                alt={pin.title}
                className="object-cover w-full h-auto aspect-[3/4] bg-gray-100"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="p-3">
                <p className="font-semibold text-sm truncate text-gray-800">
                  {pin.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PinsPage;
