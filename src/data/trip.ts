export type CurrencyCode = 'TWD' | 'VND' | 'JPY' | 'USD' | 'EUR' | 'KRW' | 'THB';

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
  hotelNameZh?: string;
  hotelNameEn?: string;
  photoUrl?: string;
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
  transferNotices?: TransferNotice[];
}

export interface TransferNotice {
  title: string;
  highlight?: string;
  warning?: string;
  details: string[];
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
  emergencyContacts: EmergencyContact[];
  mapPlaces: MapPlace[];
  mapCollectionUrl?: string;
  foodRecommendations: FoodCategory[];
  flightTracks: FlightTrack[];
  flightTicketNotes?: string[];
}

export interface EmergencyContact {
  id: string;
  category: string;
  name: string;
  phone?: string;
  address?: string;
  googleMapsUrl?: string;
}

export interface MapPlace {
  id: string;
  category: string;
  name: string;
  googleMapsUrl: string;
}

export interface FoodCategory {
  category: string;
  restaurants: FoodRecommendation[];
}

export interface FoodRecommendation {
  id: string;
  name: string;
  recommendedItems: string;
  googleMapsUrl: string;
  photoUrl: string;
  rating: string;
  hours: string;
  averageSpend: string;
}

export interface FlightTrack {
  id: string;
  direction: '去程' | '回程';
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  terminal?: string;
  flightRadarUrl: string;
  flightAwareUrl: string;
  airportUrl: string;
}

export const trip: TripData = {
  name: '富國島 6 天 5 夜',
  destination: '越南富國島',
  startDate: '2026-07-12',
  endDate: '2026-07-17',
  intro:
    '航班、住宿、地圖、天氣一次看。',
  companionsNote: '已付：機票 NT$8,324 + 住宿 NT$5,720 / 人。',
  coverImageUrl:
    'https://images.unsplash.com/photo-1758657281824-239a1bfb3c92?auto=format&fit=crop&fm=jpg&q=85&w=2400',
  homeBaseCurrency: 'TWD',
  days: [
    {
      id: 'day-1',
      day: 1,
      date: '2026-07-12',
      city: '高雄 -> 胡志明市 -> 富國島',
      highlights: ['越南航空去程', '胡志明市轉機', '抵達富國島'],
      activities: [
        {
          id: 'd1-a1',
          time: '13:00-15:00',
          place: 'KHH 高雄 -> SGN 胡志明市',
          activity: '越南航空 VN583 去程第一段',
          address: '高雄國際機場',
          googleMapsUrl: 'https://maps.google.com/?q=Kaohsiung+International+Airport',
          note: '訂位代碼 EAUE5K。抵達 SGN 後轉機約 5 小時 30 分。',
          transport: '越南航空 VN583',
          estimatedCost: { amount: 8324, currency: 'TWD' },
        },
        {
          id: 'd1-a2',
          time: '20:30-21:30',
          place: 'SGN 胡志明市 -> PQC 富國島',
          activity: '越南航空 VN1835 抵達富國島',
          address: 'Phu Quoc International Airport',
          googleMapsUrl: 'https://maps.google.com/?q=Phu+Quoc+International+Airport',
          note: '抵達後前往 Rosie Hillside Seaview Phu Quoc Apartment 入住。',
          transport: '越南航空 VN1835',
        },
        {
          id: 'd1-a3',
          time: '22:30',
          place: 'Rosie Hillside Seaview Phu Quoc Apartment',
          activity: '辦理入住、休息',
          address: 'An Thoi, Phu Quoc, Vietnam',
          googleMapsUrl:
            'https://maps.google.com/?q=Rosie+Hillside+Seaview+Phu+Quoc+Apartment',
          note: '優點：日落小鎮夜市、纜車站附近。',
          transport: '機場接送或計程車',
        },
      ],
    },
    {
      id: 'day-2',
      day: 2,
      date: '2026-07-13',
      city: '富國島南部',
      highlights: ['Sun World 跨海纜車', '水陸遊樂園', 'Kiss Bridge 水上秀'],
      activities: [
        {
          id: 'd2-a1',
          time: '09:30',
          place: 'Sun World Hon Thom',
          activity: '搭跨海纜車前往香島，玩水陸遊樂園',
          address: 'An Thoi, Phu Quoc, Kien Giang, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Sun+World+Hon+Thom+Phu+Quoc',
          note: '行程重點：SUN WORLD 跨海纜車 + 水陸遊樂園。',
          transport: '步行或計程車至纜車站',
          estimatedCost: { amount: 1000000, currency: 'VND' },
        },
        {
          id: 'd2-a2',
          time: '17:30',
          place: '日落小鎮開心夜市與親吻橋 Kiss Bridge',
          activity: '逛日落小鎮開心夜市、拍親吻橋，準備看水上秀',
          address: 'Sunset Town, An Thoi, Phu Quoc, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Kiss+Bridge+Phu+Quoc',
          note: '建議提早抵達卡位，黃昏時段光線最好。',
          transport: '步行',
          estimatedCost: { amount: 500000, currency: 'VND' },
        },
        {
          id: 'd2-a3',
          time: '18:00',
          place: 'Awaken Sea / Love Hurricane',
          activity: '黃昏水上秀，水上摩托車與特技表演',
          address: 'Sunset Town, An Thoi, Phu Quoc, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Awaken+Sea+Phu+Quoc',
          note: '免費表演，約 15-20 分鐘。',
          transport: '步行',
        },
        {
          id: 'd2-a4',
          time: '19:30-20:00',
          place: 'Symphony of the Sea',
          activity: '夜間水上煙火秀',
          address: 'Sunset Town, An Thoi, Phu Quoc, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Symphony+of+the+Sea+Phu+Quoc',
          note: '夜間水上煙火秀，表演時間約 30 分鐘。',
          transport: '步行',
        },
      ],
    },
    {
      id: 'day-3',
      day: 3,
      date: '2026-07-14',
      city: '富國島海灣',
      highlights: ['退房', 'Grand Ocean Bay Resort Phu Quoc', 'On The Rock 海邊晚餐'],
      activities: [
        {
          id: 'd3-a1',
          time: '11:00',
          place: 'Rosie Hillside Seaview Phu Quoc Apartment',
          activity: '退房，前往下一間飯店',
          address: 'An Thoi, Phu Quoc, Vietnam',
          googleMapsUrl:
            'https://maps.google.com/?q=Rosie+Hillside+Seaview+Phu+Quoc+Apartment',
          transport: '計程車或飯店接駁',
        },
        {
          id: 'd3-a2',
          time: '15:00',
          place: 'Grand Resort Ocean Bay Phu Quoc',
          activity: '入住、海灘、泳池、Spa 或釣魚',
          address: 'Phu Quoc, Kien Giang, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Grand+Resort+Ocean+Bay+Phu+Quoc',
          note: '備註：靜茹喜歡。',
          transport: '計程車或飯店接駁',
        },
        {
          id: 'd3-a3',
          time: '17:00',
          place: 'On The Rock Restaurant & Beach Bar',
          activity: '海邊晚餐，看夕陽、拍照、休息',
          address: 'Mango Bay Resort, Ong Lang Beach, Phu Quoc, Vietnam',
          googleMapsUrl:
            'https://maps.google.com/?q=On+The+Rock+Restaurant+%26+Beach+Bar+Phu+Quoc',
          note: 'Google 評分約 4.3。建議提早訂位，夕陽時段人可能較多。',
          transport: '計程車或飯店接駁',
          estimatedCost: { amount: 800000, currency: 'VND' },
        },
      ],
    },
    {
      id: 'day-4',
      day: 4,
      date: '2026-07-15',
      city: '富國島北部',
      highlights: ['Wyndham Grand Phu Quoc', '富國大世界', '北島住宿'],
      activities: [
        {
          id: 'd4-a1',
          time: '11:00',
          place: 'Grand Resort Ocean Bay Phu Quoc',
          activity: '退房，移動到 Wyndham Grand Phu Quoc',
          address: 'Phu Quoc, Kien Giang, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Grand+Resort+Ocean+Bay+Phu+Quoc',
          transport: '計程車或飯店接駁',
        },
        {
          id: 'd4-a2',
          time: '15:00',
          place: 'Wyndham Grand Phu Quoc',
          activity: '入住，使用專用海灘、泳池滑水道、Spa 或接駁車',
          address: 'Bai Dai Area, Ganh Dau, Phu Quoc, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Wyndham+Grand+Phu+Quoc',
          note: '優點：近富國大世界。',
          transport: '飯店接駁或計程車',
        },
        {
          id: 'd4-a3',
          time: '19:00',
          place: '富國大世界 Grand World Phu Quoc',
          activity: '夜間散步、吃飯、看表演或逛街',
          address: 'Ganh Dau, Phu Quoc, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Grand+World+Phu+Quoc',
          transport: '飯店接駁或計程車',
          estimatedCost: { amount: 700000, currency: 'VND' },
        },
        {
          id: 'd4-a4',
          time: '21:30-22:00',
          place: '威尼斯色彩水舞燈光秀 Colors of Venice',
          activity: '欣賞富國島大世界中央愛情湖的水舞燈光秀',
          address: 'Love Lake, Grand World Phu Quoc, Ganh Dau, Phu Quoc, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Love+Lake+Grand+World+Phu+Quoc',
          note: '地點位於富國島大世界中央的愛情湖 Love Lake。',
          transport: '飯店接駁或步行',
        },
      ],
    },
    {
      id: 'day-5',
      day: 5,
      date: '2026-07-16',
      city: '富國島北部',
      highlights: ['珍珠奇幻樂園', 'Wyndham Grand Phu Quoc', '自由活動'],
      activities: [
        {
          id: 'd5-a1',
          time: '10:00',
          place: 'VinWonders Phu Quoc',
          activity: '珍珠奇幻樂園一日遊',
          address: 'Bai Dai, Ganh Dau, Phu Quoc, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=VinWonders+Phu+Quoc',
          note: 'Day 5 重點行程：珍珠奇幻樂園。',
          transport: '飯店接駁或計程車',
          estimatedCost: { amount: 950000, currency: 'VND' },
        },
        {
          id: 'd5-a2',
          time: '19:00',
          place: 'Once Show',
          activity: '晚間壓軸大秀 Once Show',
          address: 'Fire Phoenix Square, European Streetmosphere, Grand World Phu Quoc',
          googleMapsUrl: 'https://maps.google.com/?q=Fire+Phoenix+Square+Grand+World+Phu+Quoc',
          note: '表演時間 19:00-19:20，地點位於歐洲大道 European Streetmosphere 的火鳳凰廣場。',
          transport: '飯店接駁或計程車',
        },
      ],
    },
    {
      id: 'day-6',
      day: 6,
      date: '2026-07-17',
      city: '富國島 -> 胡志明市 -> 高雄',
      highlights: ['退房', '越南航空回程', '回高雄'],
      activities: [
        {
          id: 'd6-a1',
          time: '11:00',
          place: 'Wyndham Grand Phu Quoc',
          activity: '退房，前往富國島機場',
          address: 'Bai Dai Area, Ganh Dau, Phu Quoc, Vietnam',
          googleMapsUrl: 'https://maps.google.com/?q=Wyndham+Grand+Phu+Quoc',
          transport: '飯店接駁或計程車',
        },
        {
          id: 'd6-a2',
          time: '14:35-15:45',
          place: 'PQC 富國島 -> SGN 胡志明市',
          activity: '越南航空 VN1826 回程第一段',
          address: 'Phu Quoc International Airport',
          googleMapsUrl: 'https://maps.google.com/?q=Phu+Quoc+International+Airport',
          note: '轉機約 2 小時 05 分。',
          transport: '越南航空 VN1826',
        },
        {
          id: 'd6-a3',
          time: '17:50-21:50',
          place: 'SGN 胡志明市 -> KHH 高雄',
          activity: '越南航空 VN580 回高雄',
          address: 'Tan Son Nhat International Airport',
          googleMapsUrl: 'https://maps.google.com/?q=Tan+Son+Nhat+International+Airport',
          transport: '越南航空 VN580',
        },
      ],
    },
  ],
  accommodations: [
    {
      id: 'hotel-1',
      hotelName: 'Rosie Hillside Seaview Phu Quoc Apartment',
      hotelNameZh: '富國島 Rosie 山坡海景公寓',
      hotelNameEn: 'Rosie Hillside Seaview Phu Quoc Apartment',
      photoUrl:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
      checkIn: '2026-07-12',
      checkOut: '2026-07-14',
      address: 'An Thoi, Phu Quoc, Vietnam',
      bookingInfo:
        '富國島 Rosie 山坡海景公寓，五星。NT$1,501 / 人，總價 NT$3,002。設施：無邊際泳池。優點：日落小鎮夜市、纜車站。',
      googleMapsUrl:
        'https://maps.google.com/?q=Rosie+Hillside+Seaview+Phu+Quoc+Apartment',
    },
    {
      id: 'hotel-2',
      hotelName: 'Grand Resort Ocean Bay Phu Quoc',
      hotelNameZh: '富國島海灣大度假村',
      hotelNameEn: 'Grand Resort Ocean Bay Phu Quoc',
      photoUrl:
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85',
      checkIn: '2026-07-14',
      checkOut: '2026-07-15',
      address: 'Phu Quoc, Kien Giang, Vietnam',
      bookingInfo:
        '富國島海灣大度假村，五星。NT$1,436 / 人，總價 NT$2,872。設施：專用海灘、泳池、Spa、釣魚。備註：靜茹喜歡。',
      googleMapsUrl: 'https://maps.google.com/?q=Grand+Resort+Ocean+Bay+Phu+Quoc',
    },
    {
      id: 'hotel-3',
      hotelName: 'Wyndham Grand Phu Quoc',
      hotelNameZh: '富國島溫德姆至尊飯店',
      hotelNameEn: 'Wyndham Grand Phu Quoc',
      photoUrl:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
      checkIn: '2026-07-15',
      checkOut: '2026-07-17',
      address: 'Bai Dai Area, Ganh Dau, Phu Quoc, Vietnam',
      bookingInfo:
        '富國島溫德姆至尊飯店，五星。NT$2,783 / 人，總價 NT$5,566。設施：專用海灘、泳池滑水道、賭場、Spa、接駁車。優點：近富國大世界。',
      googleMapsUrl: 'https://maps.google.com/?q=Wyndham+Grand+Phu+Quoc',
    },
  ],
  transports: [
    {
      id: 'transport-1',
      type: 'flight',
      title: '越南航空 VN583 高雄 -> 胡志明市',
      from: 'KHH 高雄',
      to: 'SGN 胡志明市',
      departureTime: '2026-07-12 13:00',
      arrivalTime: '2026-07-12 15:00',
      ticketNote: '訂位代碼 EAUE5K。去程第一段，轉機約 5 小時 30 分。',
    },
    {
      id: 'transport-2',
      type: 'flight',
      title: '越南航空 VN1835 胡志明市 -> 富國島',
      from: 'SGN 胡志明市',
      to: 'PQC 富國島',
      departureTime: '2026-07-12 20:30',
      arrivalTime: '2026-07-12 21:30',
      ticketNote: '去程第二段。',
    },
    {
      id: 'transport-3',
      type: 'flight',
      title: '越南航空 VN1826 富國島 -> 胡志明市',
      from: 'PQC 富國島',
      to: 'SGN 胡志明市',
      departureTime: '2026-07-17 14:35',
      arrivalTime: '2026-07-17 15:45',
      ticketNote: '回程第一段，轉機約 2 小時 05 分。',
    },
    {
      id: 'transport-4',
      type: 'flight',
      title: '越南航空 VN580 胡志明市 -> 高雄',
      from: 'SGN 胡志明市',
      to: 'KHH 高雄',
      departureTime: '2026-07-17 17:50',
      arrivalTime: '2026-07-17 21:50',
      ticketNote: '回程第二段。',
    },
  ],
  budget: [
    {
      id: 'budget-1',
      category: 'flight',
      label: '機票',
      cost: { amount: 8324, currency: 'TWD' },
      note: '每人 NT$8,324，總價 NT$16,648。訂位代碼 EAUE5K。',
    },
    {
      id: 'budget-2',
      category: 'accommodation',
      label: 'Rosie Hillside Seaview 7/12-7/14',
      cost: { amount: 1501, currency: 'TWD' },
      note: '每人 NT$1,501，總價 NT$3,002。',
    },
    {
      id: 'budget-3',
      category: 'accommodation',
      label: 'Grand Resort Ocean Bay 7/14-7/15',
      cost: { amount: 1436, currency: 'TWD' },
      note: '每人 NT$1,436，總價 NT$2,872。',
    },
    {
      id: 'budget-4',
      category: 'accommodation',
      label: 'Wyndham Grand Phu Quoc 7/15-7/17',
      cost: { amount: 2783, currency: 'TWD' },
      note: '每人 NT$2,783，總價 NT$5,566。',
    },
    {
      id: 'budget-5',
      category: 'transport',
      label: '島上交通預估',
      cost: { amount: 1500000, currency: 'VND' },
      note: '計程車、飯店接駁或臨時交通預留。',
    },
    {
      id: 'budget-6',
      category: 'food',
      label: '餐飲預估',
      cost: { amount: 3000000, currency: 'VND' },
      note: '以 6 天餐飲粗估，可之後再改。',
    },
    {
      id: 'budget-7',
      category: 'ticket',
      label: 'Sun World / 珍珠奇幻樂園門票預估',
      cost: { amount: 2500000, currency: 'VND' },
      note: '票價請出發前再核對官方或訂票平台。',
    },
    {
      id: 'budget-8',
      category: 'other',
      label: '備用金',
      cost: { amount: 1000, currency: 'TWD' },
      note: '臨時購物、SIM、雜支。',
    },
  ],
  importantInfo: {
    transferNotices: [
      {
        title: '轉機流程',
        highlight: '領取綠色 Transfer 轉機貼紙。',
        warning:
          '抵達胡志明市會看到 Transfer 的牌子，有一位穿著越南航空制服的人員站在那邊，大約在海關旁。越航會帶你到資料填寫處。',
        details: [
          '下飛機後會經過越南航空轉機櫃檯。',
          '告知櫃台需要轉機到富國島。',
          '越航會帶你到資料填寫處。',
        ],
      },
      {
        title: '資料填寫',
        details: [
          '繳交每一位旅客的來回電子機票 PDF 檔案。',
          '填寫護照姓名、國籍、性別及護照號碼等基本資料。',
          '越航地勤會帶你到海關的地方，並協助送你入關。',
        ],
      },
      {
        title: '行李直掛',
        warning:
          '中途轉機時有些人遇到不需要領行李，也有人仍需要領行李，建議在辦理報到時一定要跟地勤詢問確定！',
        details: [],
      },
      {
        title: '國際線轉國內線',
        details: [
          '抵達胡志明市機場後，從國際線出口出大門。',
          '出大門之後往右走，找到國內線 Domestic Terminal（轉機航廈）。',
          '接著搭 Gate / Security 的手扶梯到二樓登機門。',
        ],
      },
    ],
    passportVisa:
      '請確認護照效期與越南入境規定。實際簽證/免簽規則請出發前再以官方公告為準。',
    emergencyContact:
      '越南緊急電話：警察 113、消防 114、救護 115。台灣旅客可先備妥駐越南代表處聯絡資訊。',
    localNotes: [
      '匯率備註：1 越南盾約 0.0012 台幣；1,000 越南盾約 1.2 台幣。',
      '1,000 台幣約 833,000 越南盾，可用來快速估算現金。',
      '門票、飯店接駁與機場交通建議出發前再次確認。',
    ],
    internet: '建議準備越南 eSIM 或 SIM 卡，抵達富國島後確認飯店 Wi-Fi 與行動網路。',
    currencyNote:
      '目前以你提供的匯率 1 VND = 0.0012 TWD 做估算；網站也會嘗試抓即時匯率，抓不到時使用備用匯率。',
  },
  emergencyContacts: [
    {
      id: 'taipei-office-hcmc',
      category: '台灣駐胡志明辦事處',
      name: '駐胡志明市台北經濟文化辦事處',
      phone: '+84-28-3962-1745',
      address: '336 Nguyen Tri Phuong St., Ward 4, District 10, Ho Chi Minh City',
      googleMapsUrl:
        'https://maps.google.com/?q=Taipei+Economic+and+Cultural+Office+in+Ho+Chi+Minh+City',
    },
    {
      id: 'vinmec-phu-quoc',
      category: '富國島醫院',
      name: 'Vinmec International Hospital Phu Quoc',
      phone: '+84-297-3985-588',
      address: 'Bai Dai, Ganh Dau, Phu Quoc, Kien Giang, Vietnam',
      googleMapsUrl: 'https://maps.google.com/?q=Vinmec+International+Hospital+Phu+Quoc',
    },
    {
      id: 'vietnam-emergency',
      category: '越南緊急電話',
      name: '警察 113 / 消防 114 / 救護車 115',
      phone: '113 / 114 / 115',
      address: 'Vietnam',
      googleMapsUrl: 'https://maps.google.com/?q=Phu+Quoc+Vietnam',
    },
    {
      id: 'hotel-rosie-contact',
      category: '飯店聯絡方式',
      name: 'Rosie Hillside Seaview Phu Quoc Apartment',
      phone: '訂房平台或飯店訊息確認',
      address: 'An Thoi, Phu Quoc, Vietnam',
      googleMapsUrl:
        'https://maps.google.com/?q=Rosie+Hillside+Seaview+Phu+Quoc+Apartment',
    },
    {
      id: 'hotel-ocean-bay-contact',
      category: '飯店聯絡方式',
      name: 'Grand Resort Ocean Bay Phu Quoc',
      phone: '訂房平台或飯店訊息確認',
      address: 'Phu Quoc, Kien Giang, Vietnam',
      googleMapsUrl: 'https://maps.google.com/?q=Grand+Resort+Ocean+Bay+Phu+Quoc',
    },
    {
      id: 'hotel-wyndham-contact',
      category: '飯店聯絡方式',
      name: 'Wyndham Grand Phu Quoc',
      phone: '+84-297-3691-555',
      address: 'Bai Dai Area, Ganh Dau, Phu Quoc, Vietnam',
      googleMapsUrl: 'https://maps.google.com/?q=Wyndham+Grand+Phu+Quoc',
    },
  ],
  mapCollectionUrl:
    'https://www.google.com/maps/search/?api=1&query=Phu+Quoc+Sunset+Town+Hon+Thom+Cable+Car+Grand+World+VinWonders',
  mapPlaces: [
    {
      id: 'pqc-airport',
      category: '機場',
      name: 'Phu Quoc International Airport',
      googleMapsUrl: 'https://maps.google.com/?q=Phu+Quoc+International+Airport',
    },
    {
      id: 'sgn-airport',
      category: '機場',
      name: 'Tan Son Nhat International Airport',
      googleMapsUrl: 'https://maps.google.com/?q=Tan+Son+Nhat+International+Airport',
    },
    {
      id: 'rosie',
      category: '飯店',
      name: 'Rosie Hillside Seaview Phu Quoc Apartment',
      googleMapsUrl:
        'https://maps.google.com/?q=Rosie+Hillside+Seaview+Phu+Quoc+Apartment',
    },
    {
      id: 'ocean-bay',
      category: '飯店',
      name: 'Grand Resort Ocean Bay Phu Quoc',
      googleMapsUrl: 'https://maps.google.com/?q=Grand+Resort+Ocean+Bay+Phu+Quoc',
    },
    {
      id: 'wyndham',
      category: '飯店',
      name: 'Wyndham Grand Phu Quoc',
      googleMapsUrl: 'https://maps.google.com/?q=Wyndham+Grand+Phu+Quoc',
    },
    {
      id: 'grand-world',
      category: '景點',
      name: 'Grand World Phu Quoc',
      googleMapsUrl: 'https://maps.google.com/?q=Grand+World+Phu+Quoc',
    },
    {
      id: 'vinwonders',
      category: '景點',
      name: 'VinWonders Phu Quoc',
      googleMapsUrl: 'https://maps.google.com/?q=VinWonders+Phu+Quoc',
    },
    {
      id: 'safari',
      category: '景點',
      name: 'Vinpearl Safari Phu Quoc',
      googleMapsUrl: 'https://maps.google.com/?q=Vinpearl+Safari+Phu+Quoc',
    },
    {
      id: 'sunset-town',
      category: '景點',
      name: 'Sunset Town Phu Quoc',
      googleMapsUrl: 'https://maps.google.com/?q=Sunset+Town+Phu+Quoc',
    },
    {
      id: 'hon-thom-cable-car',
      category: '景點',
      name: 'Hon Thom Cable Car',
      googleMapsUrl: 'https://maps.google.com/?q=Hon+Thom+Cable+Car+Phu+Quoc',
    },
    {
      id: 'night-market',
      category: '夜市',
      name: 'Phu Quoc Night Market',
      googleMapsUrl: 'https://maps.google.com/?q=Phu+Quoc+Night+Market',
    },
  ],
  foodRecommendations: [
    {
      category: '海鮮',
      restaurants: [
        {
          id: 'on-the-rock',
          name: 'On The Rock Restaurant & Beach Bar',
          recommendedItems: '鮮蝦、鯡魚沙拉、咖哩甜點、海景調酒',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=On+The+Rock+Restaurant+%26+Beach+Bar+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
          rating: '4.3',
          hours: '請點 Google Maps 確認當日營業時間',
          averageSpend: '約 NT$800-1,500 / 人',
        },
        {
          id: 'sis-crab-house',
          name: "Si's Crab House",
          recommendedItems: '螃蟹、海鮮拼盤、招牌醬汁、蒜香蝦',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=Si%27s+Crab+House+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',
          rating: '4.3',
          hours: '請點 Google Maps 確認當日營業時間',
          averageSpend: '約 NT$500-900 / 人',
        },
        {
          id: 'camia-restaurant',
          name: 'Camia Restaurant',
          recommendedItems: '海鮮、越式料理、烤魚、夕陽晚餐',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=Camia+Restaurant+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
          rating: '4.5',
          hours: '請點 Google Maps 確認當日營業時間',
          averageSpend: '約 NT$400-800 / 人',
        },
      ],
    },
    {
      category: '越南料理',
      restaurants: [
        {
          id: 'bun-quay-kien-xay',
          name: 'Bún quậy KIẾN - XÂY',
          recommendedItems: '富國島特色 bún quậy、海鮮米粉、現調沾醬',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=B%C3%BAn+qu%E1%BA%ADy+KI%E1%BA%BEN+X%C3%82Y+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=80',
          rating: '4.2',
          hours: '約 07:00-21:30，分店可能不同',
          averageSpend: '約 NT$80-180 / 人',
        },
        {
          id: 'anh-thu-banh-mi',
          name: 'ANH THU - Banh Mi Xiu Mai',
          recommendedItems: '越式麵包、xíu mại 肉丸、煎蛋',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=ANH+THU+Banh+Mi+Xiu+Mai+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1600688640154-9619e002df30?auto=format&fit=crop&w=900&q=80',
          rating: '4.5',
          hours: '請點 Google Maps 確認當日營業時間',
          averageSpend: '約 NT$50-120 / 人',
        },
        {
          id: 'pho-sai-gon',
          name: 'Pho Sai Gon',
          recommendedItems: '牛肉河粉、清湯、越式咖啡',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=Pho+Sai+Gon+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=900&q=80',
          rating: '4.5',
          hours: '約 06:30-12:00、16:30-22:30',
          averageSpend: '約 NT$100-200 / 人',
        },
        {
          id: 'bun-quay-local-seafood-noodles',
          name: 'Bún Quậy Kiến-Xây | Local PhuQuoc Seafood Noodles',
          recommendedItems: '海鮮 bún quậy、魚漿、現拌醬料',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=B%C3%BAn+Qu%E1%BA%ADy+Ki%E1%BA%BFn-X%C3%A2y+Local+PhuQuoc+Seafood+Noodles',
          photoUrl:
            'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=80',
          rating: '4.2',
          hours: '約 07:00-21:30，分店可能不同',
          averageSpend: '約 NT$80-180 / 人',
        },
        {
          id: 'banh-canh-minh-thu',
          name: 'Bánh canh MINH THƯ',
          recommendedItems: '螃蟹 bánh canh、蝦、魚板、海鮮湯麵',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=B%C3%A1nh+canh+MINH+TH%C6%AF+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=900&q=80',
          rating: '4.3',
          hours: '請點 Google Maps 確認當日營業時間',
          averageSpend: '約 NT$80-150 / 人',
        },
        {
          id: 'meo-kitchen',
          name: 'MEO Kitchen',
          recommendedItems: ' bánh xèo、越式家常菜、蛤蜊炒空心菜、pho',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=MEO+Kitchen+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=900&q=80',
          rating: '4.6',
          hours: '請點 Google Maps 確認當日營業時間',
          averageSpend: '約 NT$150-350 / 人',
        },
        {
          id: 'runam-sunset-town',
          name: 'RuNam Sunset Town',
          recommendedItems: '越式料理、咖啡、甜點、日落小鎮景觀',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=RuNam+Sunset+Town+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
          rating: '4.4',
          hours: '請點 Google Maps 確認當日營業時間',
          averageSpend: '約 NT$300-700 / 人',
        },
      ],
    },
    {
      category: '披薩',
      restaurants: [
        {
          id: 'home-pizza-tran-hung-dao',
          name: 'The Home Pizza Tran Hung Dao',
          recommendedItems: '鯡魚沙拉披薩、螃蟹義大利麵、創意越式披薩',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=The+Home+Pizza+Tran+Hung+Dao+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
          rating: '4.6',
          hours: '約 11:00-22:00',
          averageSpend: '約 NT$250-500 / 人',
        },
      ],
    },
    {
      category: '咖啡廳',
      restaurants: [
        {
          id: 'chuon-chuon',
          name: 'Chuồn Chuồn Bistro & Bar',
          recommendedItems: '咖啡、雞尾酒、早午餐、山景與夕陽',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=Chu%E1%BB%93n+Chu%E1%BB%93n+Bistro+%26+Bar+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80',
          rating: '4.3',
          hours: '約 07:30-23:00',
          averageSpend: '約 NT$250-600 / 人',
        },
        {
          id: 'lotus-home-cafe',
          name: 'Lotus Home & Cafe',
          recommendedItems: '咖啡、果汁、輕食、甜點',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=Lotus+Home+%26+Cafe+Phu+Quoc',
          photoUrl:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
          rating: '4.6',
          hours: '請點 Google Maps 確認當日營業時間',
          averageSpend: '約 NT$150-350 / 人',
        },
      ],
    },
  ],
  flightTracks: [
    {
      id: 'vn583',
      direction: '去程',
      airline: '越南航空',
      flightNumber: 'VN583',
      from: 'KHH 高雄',
      to: 'SGN 胡志明市',
      departureTime: '2026-07-12 13:00',
      arrivalTime: '2026-07-12 15:00',
      terminal: 'KHH 國際航廈；SGN 轉機請依機場看板確認航廈',
      flightRadarUrl: 'https://www.flightradar24.com/data/flights/vn583',
      flightAwareUrl: 'https://www.flightaware.com/live/flight/HVN583',
      airportUrl: 'https://www.kia.gov.tw/',
    },
    {
      id: 'vn1835',
      direction: '去程',
      airline: '越南航空',
      flightNumber: 'VN1835',
      from: 'SGN 胡志明市',
      to: 'PQC 富國島',
      departureTime: '2026-07-12 20:30',
      arrivalTime: '2026-07-12 21:30',
      terminal: 'SGN 國內線航廈；PQC 富國島機場',
      flightRadarUrl: 'https://www.flightradar24.com/data/flights/vn1835',
      flightAwareUrl: 'https://www.flightaware.com/live/flight/HVN1835',
      airportUrl: 'https://www.vietnamairport.vn/tansonnhatairport/en/',
    },
    {
      id: 'vn1826',
      direction: '回程',
      airline: '越南航空',
      flightNumber: 'VN1826',
      from: 'PQC 富國島',
      to: 'SGN 胡志明市',
      departureTime: '2026-07-17 14:35',
      arrivalTime: '2026-07-17 15:45',
      terminal: 'PQC 富國島機場；SGN 抵達後轉國際線航廈',
      flightRadarUrl: 'https://www.flightradar24.com/data/flights/vn1826',
      flightAwareUrl: 'https://www.flightaware.com/live/flight/HVN1826',
      airportUrl: 'https://www.vietnamairport.vn/phuquocairport/en/',
    },
    {
      id: 'vn580',
      direction: '回程',
      airline: '越南航空',
      flightNumber: 'VN580',
      from: 'SGN 胡志明市',
      to: 'KHH 高雄',
      departureTime: '2026-07-17 17:50',
      arrivalTime: '2026-07-17 21:50',
      terminal: 'SGN 國際線航廈；KHH 國際航廈',
      flightRadarUrl: 'https://www.flightradar24.com/data/flights/vn580',
      flightAwareUrl: 'https://www.flightaware.com/live/flight/HVN580',
      airportUrl: 'https://www.vietnamairport.vn/tansonnhatairport/en/',
    },
  ],
  flightTicketNotes: [
    '纜車票：Sun World Hon Thom 跨海纜車票請集中放在手機與雲端備份。',
    'Safari：Vinpearl Safari 電子票券請確認使用日期、入場 QR Code 與同行人數。',
    'VinWonders：VinWonders 電子票券請與 Safari 票券分開標示，避免現場誤掃。',
    '接送資訊：機場與飯店接送請保留司機聯絡方式、集合點截圖與付款紀錄。',
    '電子票券：所有 PDF / QR Code 建議離線下載，另存一份在同行群組。',
  ],
};
