import {
  BadgeInfo,
  FileText,
  Globe2,
  Landmark,
  Phone,
  Plane,
  Route,
  ShieldAlert,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ImportantInfo as ImportantInfoType, TransferNotice } from '../data/trip';
import { valueOrEmpty } from '../utils/format';

interface ImportantInfoProps {
  info: ImportantInfoType;
}

export function ImportantInfo({ info }: ImportantInfoProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <InfoCard icon={BadgeInfo} title="護照與簽證" content={valueOrEmpty(info.passportVisa)} />
      <InfoCard icon={Phone} title="緊急聯絡" content={valueOrEmpty(info.emergencyContact)} />
      <InfoCard icon={Globe2} title="網路 SIM / eSIM" content={valueOrEmpty(info.internet)} />
      <InfoCard icon={Landmark} title="匯率與費用" content={valueOrEmpty(info.currencyNote)} />

      <TransferNoticeList notices={info.transferNotices ?? []} />
    </div>
  );
}

interface InfoCardProps {
  icon: LucideIcon;
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

interface TransferNoticeListProps {
  notices: TransferNotice[];
}

function TransferNoticeList({ notices }: TransferNoticeListProps) {
  if (notices.length === 0) return null;

  return (
    <article className="rounded-lg border border-amber-200 bg-amber-50/70 p-5 shadow-sm lg:col-span-2">
      <div className="mb-4 flex items-center gap-3">
        <Plane className="h-5 w-5 text-amber-700" aria-hidden="true" />
        <h3 className="text-lg font-bold text-stone-950">轉機提醒</h3>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {notices.map((notice) => (
          <TransferNoticeCard key={notice.title} notice={notice} />
        ))}
      </div>
    </article>
  );
}

function TransferNoticeCard({ notice }: { notice: TransferNotice }) {
  const Icon = notice.title.includes('票券')
    ? FileText
    : notice.title.includes('行李')
      ? ShieldAlert
      : Route;

  return (
    <section className="rounded-lg border border-amber-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-amber-700" aria-hidden="true" />
        <h4 className="font-bold text-stone-950">{notice.title}</h4>
      </div>

      {notice.highlight ? (
        <p className="mb-2 text-sm font-semibold leading-6 text-emerald-700">
          {notice.highlight}
        </p>
      ) : null}

      {notice.warning ? (
        <p className="mb-3 text-sm font-semibold leading-6 text-red-600">{notice.warning}</p>
      ) : null}

      {notice.details.length > 0 ? (
        <ol className="list-decimal space-y-1 pl-5 text-sm leading-6 text-stone-700">
          {notice.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
