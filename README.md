# 🔋 Taiwan 3D Power & Clean Energy Map

一個以台灣為主題的 3D 電力與再生能源視覺化專案，結合實時數據、3D 地圖與互動式圖形，打造資訊豐富且具有現代感的網頁體驗。適合用於展示能源狀況、地理分布與互動分析。

## 🚀 功能特色 Features

- 🔹 **用電與再生能源可視化**  
  結合台灣電力區域用電資料與再生能源設施位置（如太陽能、風力、水力等），在 3D 地圖中動態呈現。

- 🔹 **3D 地圖與建模整合**  
  使用 SVG 地圖轉換成 ExtrudeGeometry 立體地形，搭配 GLB 模型展現不同能源類型的發電設施。

- 🔹 **互動式鏡頭動畫**  
  點選能源場或地區後自動 Zoom in 聚焦，切換模式時回到全圖視角，提升使用體驗與視覺導引。

- 🔹 **裝置響應式設計（RWD）**  
  手機版介面設計具選單展開/收合功能，方便閱讀資訊並保留地圖互動空間。

- 🔹 **地圖雙模式切換**  
  提供「全台用電區域圖」與「再生能源設施地圖」兩種模式，依據不同資料與場景需求呈現。

- 🔹 **即時資料綁定與狀態管理**  
  使用 Zustand 管理資料狀態，動態綁定區域與能源資訊，支援互動動畫與狀態同步。

- 🔹 **3D 模型延遲載入優化**  
  透過 `<Suspense>` 包裹模型元件，自動處理模型載入過程，避免畫面中斷，目前無明顯延遲問題。

---

## 🛠 技術與架構 Technology Stack

| 分類         | 技術內容                                                                 |
|--------------|--------------------------------------------------------------------------|
| 架構與框架   | [Next.js](https://nextjs.org/)（App Router 架構，支援 SSR / API Routes） |
| 開發語言     | TypeScript、React                                                       |
| UI 工具      | [Tailwind CSS](https://tailwindcss.com/)（包含 RWD 響應式設計配置）     |
| 3D 引擎      | [Three.js](https://threejs.org/)、[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) |
| 3D 工具包    | [@react-three/drei](https://github.com/pmndrs/drei)（如 OrbitControls、Html） |
| 狀態管理     | [Zustand](https://github.com/pmndrs/zustand)（全局共享資料）             |
| 3D 加載優化  | React `<Suspense>` 包裝 3D 模型（延遲加載、避免阻塞）                   |
| 資料處理     | Next.js API Route 擷取政府 CSV 資料、轉為 JSON 提供前端使用             |
| CSV 工具     | [PapaParse](https://www.papaparse.com/)（於後端處理 .csv 檔）            |

> 註：專案初期以 Vite + React 為原型架構，後期為整合資料處理與部署擴充，重構為 Next.js。

---

## 📊 數據來源與版權聲明

- **電力與再生能源數據來源**  
  資料取自政府資料開放平台：[https://data.gov.tw](https://data.gov.tw)

  - 台灣每日用電資料（CSV）：  
    https://service.taipower.com.tw/data/opendata/apply/file/d006019/001.csv

  - 再生能源發電設施資料：  
    https://data.gov.tw/dataset/17141

- **3D 模型來源與授權**  
  所使用的 3D 模型皆來自 [Poly.pizza](https://poly.pizza/) 與 CC 授權開源資源庫，詳細授權與出處請參考 [About 頁面](/about)。

---

## 📄 後續擴充與優化方向

- ☑ 將今日用電 CSV 整合為 API，已完成
- 🔄 模型動畫與視覺強化（選擇性優化）
- 🔄 地圖海岸線與外海處理（美術調整）
- 🧩 可考慮導入 [n8n](https://n8n.io) 等工具進行資料更新自動化（例如：定期偵測來源更新）
- 🌐 多語系與英文支援（延伸選項） 

---

## 🙋 關於我

本專案由Tom Yuan製作，作為前端與 3D 技術整合展示用作品。若有合作或技術交流歡迎透過[我的portfolio](https://t1123425.github.io/my-portfolio/)聯繫我！

