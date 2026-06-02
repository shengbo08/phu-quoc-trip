import { MapPinned, Star } from 'lucide-react';
import type { FoodCategory } from '../data/trip';
import { EmptyState } from './EmptyState';

interface FoodRecommendationsProps {
  categories: FoodCategory[];
}

export function FoodRecommendations({ categories }: FoodRecommendationsProps) {
  if (categories.length === 0) return <EmptyState />;

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.category}>
          <h3 className="mb-3 text-xl font-bold text-stone-950">{category.category}</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {category.restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm"
              >
                <img
                  src={restaurant.photoUrl}
                  alt={restaurant.name}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-lg font-bold text-stone-950">{restaurant.name}</h4>
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-sm font-bold text-amber-700">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {restaurant.rating}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-2 text-sm text-stone-600">
                    <div>
                      <dt className="font-semibold text-stone-800">推薦</dt>
                      <dd>{restaurant.recommendedItems}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-800">營業時間</dt>
                      <dd>{restaurant.hours}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-800">人均消費</dt>
                      <dd>{restaurant.averageSpend}</dd>
                    </div>
                  </dl>
                  <a
                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-800"
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
        </div>
      ))}
    </div>
  );
}
