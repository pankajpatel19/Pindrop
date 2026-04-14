import Image from "next/image";
import React from "react";

async function SearchPage({ searchParams }) {
  const { query, image } = await searchParams;

  return (
    <>
      <div className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer shadow-lg transition-all duration-500">
        <Image
          src={image}
          alt={query}
          fill
          className="object-cover transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 " />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <h3 className="text-white text-xl md:text-2xl font-bold text-center transform transition-transform duration-500  drop-shadow-lg">
            {query}
          </h3>
        </div>

        {/* Bottom Interactive Bar (Optional Polish) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 transition-transform duration-500 origin-left" />
      </div>

      <main className="px-4 py-8">
        <h2 className="text-2xl font-bold text-foreground m-4">
          Ideas like this
        </h2>
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-6 space-y-6">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="break-inside-avoid mb-6 group h-fit">
              <div className="relative overflow-hidden rounded-3xl bg-zinc-50 shadow-sm border border-zinc-100 transition-all cursor-pointer">
                <Image
                  src={`https://source.unsplash.com/random/?${query}&${index}`}
                  alt={query}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover rounded-3xl transition-all duration-500 group-hover:brightness-90"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default SearchPage;
