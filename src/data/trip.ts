export type CurrencyCode = 'TWD' | 'JPY' | 'USD' | 'EUR' | 'KRW' | 'THB';

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface ItineraryActivity {
  id: string;
  time: string;
  place: string;
  activity: string;
  address?: string;
  googleMapsUrl?: string;
  note?: string;
  transport?: string;
  estimatedCost?: Money;
}

export interface TripDay {
  id: string;
  day: number;
  date: string;
  city: string;
  highlights: string[];
  activities: ItineraryActivity[];
}

export interface Accommodation {
  id: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  address?: string;
  bookingInfo?: string;
  googleMapsUrl?: string;
}

export type TransportType = 'flight' | 'train' | 'bus' | 'car' | 'other';

export interface TransportInfo {
  id: string;
  type: TransportType;
  title: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  ticketNote?: string;
}

export type BudgetCategory =
  | 'flight'
  | 'accommodation'
  | 'transport'
  | 'food'
  | 'ticket'
  | 'other';

export interface BudgetItem {
  id: string;
  category: BudgetCategory;
  label: string;
  cost: Money;
  note?: string;
}

export interface ImportantInfo {
  passportVisa?: string;
  emergencyContact?: string;
  localNotes?: string[];
  internet?: string;
  currencyNote?: string;
}

export interface TripData {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  intro: string;
  companionsNote?: string;
  coverImageUrl: string;
  homeBaseCurrency: CurrencyCode;
  days: TripDay[];
  accommodations: Accommodation[];
  transports: TransportInfo[];
  budget: BudgetItem[];
  importantInfo: ImportantInfo;
}

export const trip: TripData = {
  name: '東京春日散步 5 日',
  destination: '日本東京、河口湖',
  startDate: '2026-04-10',
  endDate: '2026-04-14',
  intro:
    '用五天慢慢收集東京的城市節奏、湖畔風景和幾頓漂亮的晚餐。這份公開行程方便朋友查看時間、地點、交通與預算。',
  companionsNote: '旅伴：3 位朋友同行。備註：每日行程保留彈性休息時間。',
  coverImageUrl:
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=80',
  homeBaseCurrency: 'TWD',
  days: [
    {
      id: 'day-1',
      day: 1,
      date: '2026-04-10',
      city: '台北 -> 東京',
      highlights: ['抵達成田機場', '淺草散步', '晴空塔夜景'],
      activities: [
        {
          id: 'd1-a1',
          time: '08:30',
          place: '桃園國際機場',
          activity: '集合、辦理登機與托運行李',
          address: '桃園市大園區航站南路9號',
          googleMapsUrl: 'https://maps.google.com/?q=桃園國際機場',
          note: '建議提早 2.5 小時抵達。',
          transport: '機場捷運',
          estimatedCost: { amount: 150, currency: 'TWD' },
        },
        {
          id: 'd1-a2',
          time: '15:00',
          place: '淺草寺',
          activity: '參拜、仲見世通小吃散步',
          address: '2 Chome-3-1 Asakusa, Taito City, Tokyo',
          googleMapsUrl: 'https://maps.google.com/?q=Senso-ji',
          note: '附近有很多伴手禮店。',
          transport: '京成線 + 地鐵',
          estimatedCost: { amount: 1800, currency: 'JPY' },
        },
        {
          id: 'd1-a3',
          time: '19:30',
          place: '東京晴空塔',
          activity: '看夜景與晚餐',
          address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo',
          googleMapsUrl: 'https://maps.google.com/?q=Tokyo+Skytree',
          note: '若天氣不好可改逛 Solamachi。',
          transport: '地鐵',
          estimatedCost: { amount: 4500, currency: 'JPY' },
        },
      ],
    },
    {
      id: 'day-2',
      day: 2,
      date: '2026-04-11',
      city: '東京',
      highlights: ['明治神宮', '表參道', '澀谷 Sky'],
      activities: [
        {
          id: 'd2-a1',
          time: '09:30',
          place: '明治神宮',
          activity: '森林步道與神社參觀',
          address: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo',
          googleMapsUrl: 'https://maps.google.com/?q=Meiji+Jingu',
          transport: 'JR 山手線',
          estimatedCost: { amount: 600, currency: 'JPY' },
        },
        {
          id: 'd2-a2',
          time: '13:00',
          place: '表參道',
          activity: '午餐、咖啡與選物店',
          address: 'Omotesando, Minato City, Tokyo',
          googleMapsUrl: 'https://maps.google.com/?q=Omotesando',
          note: '可依大家體力調整逛街時間。',
          transport: '步行',
          estimatedCost: { amount: 5200, currency: 'JPY' },
        },
        {
          id: 'd2-a3',
          time: '18:00',
          place: 'Shibuya Sky',
          activity: '夕陽與城市夜景',
          address: '2 Chome-24-12 Shibuya, Shibuya City, Tokyo',
          googleMapsUrl: 'https://maps.google.com/?q=Shibuya+Sky',
          note: '門票建議先線上預約。',
          transport: '地鐵',
          estimatedCost: { amount: 3000, currency: 'JPY' },
        },
      ],
    },
    {
      id: 'day-3',
      day: 3,
      date: '2026-04-12',
      city: '東京 -> 河口湖',
      highlights: ['高速巴士移動', '河口湖自然生活館', '溫泉旅館'],
      activities: [
        {
          id: 'd3-a1',
          time: '08:10',
          place: '新宿高速巴士總站',
          activity: '搭巴士前往河口湖',
          address: '5 Chome-24-55 Sendagaya, Shibuya City, Tokyo',
          googleMapsUrl: 'https://maps.google.com/?q=Shinjuku+Expressway+Bus+Terminal',
          transport: '高速巴士',
          estimatedCost: { amount: 2400, currency: 'JPY' },
        },
        {
          id: 'd3-a2',
          time: '12:30',
          place: '河口湖自然生活館',
          activity: '湖畔散步、拍富士山與午餐',
          address: 'Oishi, Fujikawaguchiko, Yamanashi',
          googleMapsUrl: 'https://maps.google.com/?q=Kawaguchiko+Natural+Living+Center',
          transport: '周遊巴士',
          estimatedCost: { amount: 3500, currency: 'JPY' },
        },
        {
          id: 'd3-a3',
          time: '17:00',
          place: '溫泉旅館',
          activity: '入住、晚餐與泡湯',
          address: 'Fujikawaguchiko, Yamanashi',
          googleMapsUrl: 'https://maps.google.com/?q=Fujikawaguchiko+Onsen',
          note: '晚餐時間需依旅館安排。',
          transport: '接駁車',
          estimatedCost: { amount: 0, currency: 'JPY' },
        },
      ],
    },
    {
      id: 'day-4',
      day: 4,
      date: '2026-04-13',
      city: '河口湖 -> 東京',
      highlights: ['富士山景點', '返回東京', '銀座晚餐'],
      activities: [
        {
          id: 'd4-a1',
          time: '09:00',
          place: '新倉山淺間公園',
          activity: '五重塔與富士山景觀',
          address: '2 Chome-4-1 Asama, Fujiyoshida, Yamanashi',
          googleMapsUrl: 'https://maps.google.com/?q=Arakurayama+Sengen+Park',
          transport: '計程車或電車',
          estimatedCost: { amount: 2200, currency: 'JPY' },
        },
        {
          id: 'd4-a2',
          time: '14:30',
          place: '河口湖站',
          activity: '搭車返回東京',
          address: 'Funatsu, Fujikawaguchiko, Yamanashi',
          googleMapsUrl: 'https://maps.google.com/?q=Kawaguchiko+Station',
          transport: '高速巴士',
          estimatedCost: { amount: 2400, currency: 'JPY' },
        },
        {
          id: 'd4-a3',
          time: '19:00',
          place: '銀座',
          activity: '晚餐與夜間散步',
          address: 'Ginza, Chuo City, Tokyo',
          googleMapsUrl: 'https://maps.google.com/?q=Ginza+Tokyo',
          transport: '地鐵',
          estimatedCost: { amount: 6500, currency: 'JPY' },
        },
      ],
    },
    {
      id: 'day-5',
      day: 5,
      date: '2026-04-14',
      city: '東京 -> 台北',
      highlights: ['築地市場', '伴手禮採買', '返程'],
      activities: [
        {
          id: 'd5-a1',
          time: '09:00',
          place: '築地場外市場',
          activity: '早餐與最後採買',
          address: '4 Chome-16-2 Tsukiji, Chuo City, Tokyo',
          googleMapsUrl: 'https://maps.google.com/?q=Tsukiji+Outer+Market',
          transport: '地鐵',
          estimatedCost: { amount: 4000, currency: 'JPY' },
        },
        {
          id: 'd5-a2',
          time: '13:30',
          place: '成田國際機場',
          activity: '辦理登機、逛免稅店',
          address: '1-1 Furugome, Narita, Chiba',
          googleMapsUrl: 'https://maps.google.com/?q=Narita+International+Airport',
          note: '預留退稅與托運時間。',
          transport: 'Skyliner',
          estimatedCost: { amount: 3000, currency: 'JPY' },
        },
      ],
    },
  ],
  accommodations: [
    {
      id: 'hotel-1',
      hotelName: 'Hotel Metropolitan Tokyo Marunouchi',
      checkIn: '2026-04-10',
      checkOut: '2026-04-12',
      address: '1 Chome-7-12 Marunouchi, Chiyoda City, Tokyo',
      bookingInfo: 'Agoda 預訂，雙床房 2 晚，入住時出示護照。',
      googleMapsUrl: 'https://maps.google.com/?q=Hotel+Metropolitan+Tokyo+Marunouchi',
    },
    {
      id: 'hotel-2',
      hotelName: 'Fuji Lake Hotel',
      checkIn: '2026-04-12',
      checkOut: '2026-04-13',
      address: '1 Funatsu, Fujikawaguchiko, Yamanashi',
      bookingInfo: '官網預訂，含晚餐與早餐。',
      googleMapsUrl: 'https://maps.google.com/?q=Fuji+Lake+Hotel',
    },
    {
      id: 'hotel-3',
      hotelName: 'Tokyu Stay Ginza',
      checkIn: '2026-04-13',
      checkOut: '2026-04-14',
      address: '4 Chome-10-5 Ginza, Chuo City, Tokyo',
      bookingInfo: 'Booking.com 預訂，一晚城市景房。',
      googleMapsUrl: 'https://maps.google.com/?q=Tokyu+Stay+Ginza',
    },
  ],
  transports: [
    {
      id: 'transport-1',
      type: 'flight',
      title: 'BR198 台北 TPE -> 東京 NRT',
      from: '桃園國際機場',
      to: '成田國際機場',
      departureTime: '2026-04-10 10:45',
      arrivalTime: '2026-04-10 14:55',
      ticketNote: '電子機票，行李 23kg x 1。',
    },
    {
      id: 'transport-2',
      type: 'bus',
      title: '新宿 -> 河口湖高速巴士',
      from: '新宿高速巴士總站',
      to: '河口湖站',
      departureTime: '2026-04-12 08:10',
      arrivalTime: '2026-04-12 10:05',
      ticketNote: '建議先線上訂票並列印 QR code。',
    },
    {
      id: 'transport-3',
      type: 'train',
      title: 'Skyliner 上野 -> 成田',
      from: '京成上野站',
      to: '成田機場',
      departureTime: '2026-04-14 12:40',
      arrivalTime: '2026-04-14 13:25',
      ticketNote: '可使用線上購票憑證取票。',
    },
  ],
  budget: [
    {
      id: 'budget-1',
      category: 'flight',
      label: '來回機票',
      cost: { amount: 13800, currency: 'TWD' },
      note: '含託運行李。',
    },
    {
      id: 'budget-2',
      category: 'accommodation',
      label: '東京住宿 3 晚',
      cost: { amount: 72000, currency: 'JPY' },
    },
    {
      id: 'budget-3',
      category: 'accommodation',
      label: '河口湖溫泉旅館 1 晚',
      cost: { amount: 42000, currency: 'JPY' },
      note: '含早晚餐。',
    },
    {
      id: 'budget-4',
      category: 'transport',
      label: '當地交通與巴士',
      cost: { amount: 28000, currency: 'JPY' },
    },
    {
      id: 'budget-5',
      category: 'food',
      label: '餐飲預算',
      cost: { amount: 46000, currency: 'JPY' },
    },
    {
      id: 'budget-6',
      category: 'ticket',
      label: '景點門票',
      cost: { amount: 12000, currency: 'JPY' },
    },
    {
      id: 'budget-7',
      category: 'other',
      label: '伴手禮與備用金',
      cost: { amount: 12000, currency: 'TWD' },
    },
  ],
  importantInfo: {
    passportVisa:
      '護照效期建議至少 6 個月以上。台灣旅客短期觀光日本通常免簽，出發前仍請以官方公告為準。',
    emergencyContact:
      '台灣日本關係協會東京辦事處：+81-3-3280-7811；日本緊急電話：警察 110、救護/消防 119。',
    localNotes: [
      '日本大眾交通多數可使用 Suica / Pasmo。',
      '熱門景點門票建議提早預約。',
      '請準備少量現金，部分小店不一定收信用卡。',
    ],
    internet: '建議購買 5 天 eSIM，每日 1GB 或吃到飽方案，抵達後再啟用。',
    currencyNote:
      '預算以新台幣為總計基準，外幣會透過即時匯率換算；若 API 失敗會使用 fallback 匯率並標示。',
  },
};
