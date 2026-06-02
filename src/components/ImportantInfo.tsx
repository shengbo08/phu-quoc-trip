import { AlertTriangle, BadgeInfo, Globe2, Landmark, Phone } from 'lucide-react';
import type { ImportantInfo as ImportantInfoType } from '../data/trip';
import { valueOrEmpty } from '../utils/format';

interface ImportantInfoProps {
  info: ImportantInfoType;
}

export function ImportantInfo({ info }: ImportantInfoProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <InfoCard
        icon={BadgeInfo}
        title="護照與簽證"
        content={valueOrEmpty(info.passportVisa)}
      />
      <InfoCard
        icon={Phone}
        title="緊急聯絡"
        content={valueOrEmpty(info.emergencyContact)}
      />
      <InfoCard icon={Globe2} title="網路 SIM / eSIM" content={valueOrEmpty(info.internet)} />
      <InfoCard
        icon={Landmark}
        title="貨幣與匯率"
        content={valueOrEmpty(info.currencyNote)}
      />
      <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm lg:col-span-2">
        <div className="mb-3 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-teal-700" aria-hidden="true" />
          <h3 className="text-lg font-bold text-stone-950">當地注意事項</h3>
        </div>
        {info.localNotes?.length ? (
          <ul className="grid gap-2 text-sm leading-6 text-stone-600 sm:grid-cols-3">
            {info.localNotes.map((note) => (
              <li key={note} className="rounded-lg bg-stone-50 p-3">
                {note}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-stone-500">尚未填寫</p>
        )}
      </article>
    </div>
  );
}

interface InfoCardProps {
  icon: typeof BadgeInfo;
  title: string;
  content: string;
}

function InfoCard({ icon: Icon, title, content }: InfoCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <Icon className="h-5 w-5 text-teal-700" aria-hidden="true" />
        <h3 className="text-lg font-bold text-stone-950">{title}</h3>
      </div>
      <p className="text-sm leading-7 text-stone-600">{content}</p>
    </article>
  );
}
