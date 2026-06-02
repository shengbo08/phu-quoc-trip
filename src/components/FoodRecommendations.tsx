import { Clock, MapPinned, Star, Utensils } from 'lucide-react';
import type { ReactNode } from 'react';
import type { FoodCategory } from '../data/trip';
import { EmptyState } from './EmptyState';

interface FoodRecommendationsProps {
  categories: FoodCategory[];
}

export function FoodRecommendations({ categories }: FoodRecommendationsProps) {
  if (categories.length === 0) return <EmptyState />;

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <section key={category.category}>
          <h3 className="mb-3 text-xl font-black text-stone-950">{category.category}</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {category.restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={restaurant.photoUrl}
                  alt={restaurant.name}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-lg font-black leading-snug text-stone-950">
                      {restaurant.name}
                    </h4>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-sm font-bold text-amber-700">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {restaurant.rating}
                    </span>
                  </div>

                  <div className="mt-3 space-y-3 text-sm text-stone-700">
                    <InfoRow icon={<Utensils className="h-4 w-4" />} label={restaurant.recommendedItems} />
                    <InfoRow icon={<Clock className="h-4 w-4" />} label={restaurant.hours} />
                    <p className="rounded-md bg-stone-50 px-3 py-2 font-bold text-stone-800">
                      {restaurant.averageSpend}
                    </p>
                  </div>

                  <a
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
                    href={restaurant.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPinned className="h-4 w-4" />
                    Google Maps
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function InfoRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <p className="flex items-start gap-2 leading-6">
      <span className="mt-1 shrink-0 text-teal-700">{icon}</span>
      <span>{label}</span>
    </p>
  );
}
