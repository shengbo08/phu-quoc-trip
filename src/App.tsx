import { useMemo, useState } from 'react';
import { AccommodationList } from './components/AccommodationList';
import { BudgetSection } from './components/BudgetSection';
import { DayDetails } from './components/DayDetails';
import { Hero } from './components/Hero';
import { ImportantInfo } from './components/ImportantInfo';
import { Section } from './components/Section';
import { TransportList } from './components/TransportList';
import { TripOverview } from './components/TripOverview';
import { trip } from './data/trip';

function App() {
  const [selectedDayId, setSelectedDayId] = useState(trip.days[0]?.id ?? '');

  const selectedDay = useMemo(
    () => trip.days.find((day) => day.id === selectedDayId) ?? trip.days[0],
    [selectedDayId],
  );

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <Hero trip={trip} />

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Section id="overview" eyebrow="Overview" title="行程總覽">
          <TripOverview
            days={trip.days}
            selectedDayId={selectedDay?.id ?? ''}
            onSelectDay={setSelectedDayId}
          />
        </Section>

        <Section id="details" eyebrow="Daily Plan" title="每日詳細行程">
          <DayDetails day={selectedDay} />
        </Section>

        <Section id="stays" eyebrow="Stay" title="住宿資訊">
          <AccommodationList accommodations={trip.accommodations} />
        </Section>

        <Section id="transport" eyebrow="Transport" title="交通資訊">
          <TransportList transports={trip.transports} />
        </Section>

        <Section id="budget" eyebrow="Budget" title="預算與匯率核算">
          <BudgetSection items={trip.budget} baseCurrency={trip.homeBaseCurrency} />
        </Section>

        <Section id="info" eyebrow="Notes" title="重要資訊">
          <ImportantInfo info={trip.importantInfo} />
        </Section>
      </main>
    </div>
  );
}

export default App;
