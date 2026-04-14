import Image from "next/image";
import Link from "next/link";
import React from "react";

const CATEGORIES = [
  {
    name: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Animal",
    image:
      "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Art",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Design",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "DIY and Craft",
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Food and Drink",
    image:
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Health and Fitness",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Mens fashion",
    image:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Nature",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Architecture",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Photography",
    image:
      "https://images.unsplash.com/photo-1452457750107-cd0842ae177d?auto=format&fit=crop&q=80&w=800",
  },
];

function ShowIdeas() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Browse by Category
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore thousands of ideas across curated categories to spark your
            next creative project.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <Link
                href={{
                  pathname: "/home/ideas/search",
                  query: { query: category.name, image: category.image },
                }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h3 className="text-white text-xl md:text-2xl font-bold text-center transform transition-transform duration-500 group-hover:scale-110 drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>

                {/* Bottom Interactive Bar (Optional Polish) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100" />
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default ShowIdeas;
