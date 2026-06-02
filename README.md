# 出國行程網站

這是一個 React + Vite + TypeScript + Tailwind CSS 建立的公開旅行行程網站。你可以把排好的行程寫在 `src/data/trip.ts`，部署到 GitHub Pages 或 Vercel 後，把連結分享給朋友查看。

## 專案結構

```txt
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
└── src
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    ├── components
    │   ├── AccommodationList.tsx
    │   ├── BudgetSection.tsx
    │   ├── DayDetails.tsx
    │   ├── EmptyState.tsx
    │   ├── Hero.tsx
    │   ├── ImportantInfo.tsx
    │   ├── MapButton.tsx
    │   ├── Section.tsx
    │   ├── TransportList.tsx
    │   └── TripOverview.tsx
    ├── data
    │   └── trip.ts
    └── utils
        ├── exchangeRates.ts
        └── format.ts
```

## 安裝

```bash
npm install
```

## 啟動開發環境

```bash
npm run dev
```

啟動後打開終端機顯示的網址，通常是 `http://localhost:5173`。

## 修改行程資料

請直接編輯：

```txt
src/data/trip.ts
```

你可以在這裡修改：

- 旅行名稱、目的地、旅行日期、簡介、旅伴備註
- Day 1、Day 2、Day 3 等每日行程
- 每個活動的時間、地點、地址、Google Maps 連結、交通方式、預估花費
- 住宿資訊
- 航班、火車、巴士、租車等交通資訊
- 預算項目
- 護照簽證、緊急聯絡、SIM / eSIM、貨幣備註

新增天數時，在 `days` 陣列新增一筆 `TripDay`；新增景點時，在該天的 `activities` 陣列新增一筆 `ItineraryActivity`。

## 預算與動態匯率

預算資料放在 `trip.budget`。每筆預算可設定不同幣別，例如：

```ts
{
  id: 'budget-food',
  category: 'food',
  label: '餐飲預算',
  cost: { amount: 46000, currency: 'JPY' },
}
```

網站會在瀏覽器端呼叫 Frankfurter API 抓取即時匯率，並將外幣換算成新台幣加總。若網路或 API 暫時失敗，網站會使用 `src/utils/exchangeRates.ts` 裡的 fallback 匯率並在畫面上標示。

目前支援幣別：`TWD`、`JPY`、`USD`、`EUR`、`KRW`、`THB`。

## 建置

```bash
npm run build
```

完成後會產生 `dist` 資料夾。

## 部署到公開網址

最簡單做法：先把整個專案丟到 GitHub，再用 Vercel 接 GitHub repository。

1. 在 GitHub 建立一個新的 repository。
2. 在本機把這個專案 push 到 GitHub。
3. 到 Vercel 匯入該 repository。
4. Framework Preset 選 `Vite`。
5. Build Command 使用 `npm run build`。
6. Output Directory 使用 `dist`。
7. 部署完成後，Vercel 會給你一個公開網址。

GitHub Pages 也可以，但 Vercel 對 Vite 專案最省事，基本上 push 後自動部署。

## 丟到 GitHub

```bash
git init
git add .
git commit -m "Create travel itinerary site"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPO.git
git push -u origin main
```

把 `YOUR_ACCOUNT` 和 `YOUR_REPO` 換成你的 GitHub 帳號與 repo 名稱。
