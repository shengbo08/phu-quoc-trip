import { useCallback, useMemo, useState } from 'react';
import { AccommodationList } from './components/AccommodationList';
import { BudgetSection } from './components/BudgetSection';
import { DayDetails } from './components/DayDetails';
import { EmergencyContacts } from './components/EmergencyContacts';
import { ExchangeRateCard } from './components/ExchangeRateCard';
import { FlightTracker } from './components/FlightTracker';
import { FoodRecommendations } from './components/FoodRecommendations';
import { Hero } from './components/Hero';
import { ImportantInfo } from './components/ImportantInfo';
import { MapCollection } from './components/MapCollection';
import { Section } from './components/Section';
import { TransportList } from './components/TransportList';
import { TripOverview } from './components/TripOverview';
import { WeatherCard } from './components/WeatherCard';
import { trip } from './data/trip';
import type { DailyWeather } from './utils/weather';

function App() {
  const [selectedDayId, setSelectedDayId] = useState(trip.days[0]?.id ?? '');
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[]>([]);

  const selectedDay = useMemo(
    () => trip.days.find((day) => day.id === selectedDayId) ?? trip.days[0],
    [selectedDayId],
  );

  const selectedDayWeather = useMemo(
    () => dailyWeather.find((weather) => weather.date === selectedDay?.date),
    [dailyWeather, selectedDay?.date],
  );

  const handleDailyWeatherChange = useCallback((weather: DailyWeather[]) => {
    setDailyWeather(weather);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <Hero trip={trip} />

      <main className="mx-auto max-w-6xl overflow-hidden px-4 pb-16 sm:px-6">
        <Section id="live" eyebrow="Live" title="即時資訊">
          <div className="grid gap-4 lg:grid-cols-2">
            <WeatherCard onDailyWeatherChange={handleDailyWeatherChange} />
            <ExchangeRateCard />
          </div>
        </Section>

        <Section id="overview" eyebrow="Overview" title="行程總覽">
          <TripOverview
            days={trip.days}
            selectedDayId={selectedDay?.id ?? ''}
            onSelectDay={setSelectedDayId}
          />
        </Section>

        <Section id="details" eyebrow="Daily Plan" title="每日詳細行程">
          <DayDetails day={selectedDay} weather={selectedDayWeather} />
        </Section>

        <Section id="flights" eyebrow="Flight" title="航班追蹤">
          <FlightTracker flights={trip.flightTracks} />
        </Section>

        <Section id="stays" eyebrow="Stay" title="住宿資訊">
          <AccommodationList accommodations={trip.accommodations} />
        </Section>

        <Section id="transport" eyebrow="Transport" title="交通資訊">
          <TransportList transports={trip.transports} />
        </Section>

        <Section id="maps" eyebrow="Maps" title="Google Maps 景點集合">
          <MapCollection places={trip.mapPlaces} collectionUrl={trip.mapCollectionUrl} />
        </Section>

        <Section id="food" eyebrow="Food" title="美食推薦">
          <FoodRecommendations categories={trip.foodRecommendations} />
        </Section>

        <Section id="budget" eyebrow="Budget" title="預算與匯率核算">
          <BudgetSection items={trip.budget} baseCurrency={trip.homeBaseCurrency} />
        </Section>

        <Section id="emergency" eyebrow="Emergency" title="緊急聯絡資訊">
          <EmergencyContacts contacts={trip.emergencyContacts} />
        </Section>

        <Section id="info" eyebrow="Notes" title="重要資訊">
          <ImportantInfo info={trip.importantInfo} />
        </Section>
      </main>
    </div>
  );
}

export default App;
