export default function About() {
    return (
        <section style={{ position: 'relative', zIndex: 1 }} className="w-full bg-white md:h-full">
            <div className="max-w-7xl mx-auto  px-4 pt-20 sm:px-6 lg:px-8">
                 <h1 className="text-center py-2 text-blue-600 text-3xl font-bold border-b-2 border-gray-300">關於本平台</h1>
                <div className="text-center mt-2 text-sm md:text-base">
                    <p>本平台旨在透過 3D 可視化方式，展示台灣每日用電概況與再生能源設施分佈，讓使用者更直觀地了解全台區域的電力結構與綠能發展情形。</p>
                    <p className="mt-1">地圖以 R3F (React Three Fiber) 技術實現互動操作，並結合實際開放資料來源，提供視覺化的即時能源資訊。</p>
                    <p className="mt-2 font-semibold text-gray-700">備注：本平台目前為個人作品展示用途，僅用於技術與資料視覺化示範，非正式政府網站或商業產品。</p>
                </div>
                <div className="mt-2 text-sm md:text-base">
                    <h2 className="text-base md:text-lg font-semibold text-gray-600 mb-2">功能特色</h2>
                    <ul className="list-decimal px-5 ">
                        <li>可視化展示每日全台各縣市用電與再生能源發電情形</li>
                        <li>支援切換不同能源類型（如太陽能、風力、水力等），並顯示相對應的 3D 模型</li>
                        <li>點選指定地區可自動聚焦鏡頭、放大顯示並呈現該地區詳細電力資訊</li>
                        <li>切換地圖模式後自動回縮視角，回到全台視野，減少多餘視角操作</li>
                        <li>手機裝置上提供可收合式選單，方便使用者切換資料與瀏覽地圖</li>
                        <li>互動地圖整合多種再生能源資訊，增強數據理解與地理空間感知</li>
                    </ul>
                </div>
                <div className="mt-2 text-sm md:text-base">
                    <h2 className="text-base md:text-lg font-semibold text-gray-600 mb-2">數據來源</h2>
                    <p>本平台所呈現之用電與能源資料，皆來自「政府資料開放平台」，數據皆屬公開且合法使用：</p>
                    <ul className="list-disc px-5">
                    <li>
                        <a href="https://data.gov.tw/" target="_blank" className="text-blue-600">政府資料開放平台首頁</a>
                    </li>
                    <li>
                        <a href="https://data.gov.tw/dataset/162596" target="_blank" className="text-blue-600">台灣電力公司今日區域別用電情況</a>
                    </li>
                    <li>
                        <a href="https://data.gov.tw/dataset/17141" target="_blank" className="text-blue-600">台灣電力公司再生能源各場址資料</a>
                    </li>
                    </ul>
                </div>
                <div className="mt-2 mt-2 text-sm md:text-base">
                    <h2 className="text-base md:text-lg font-semibold text-gray-600 mb-2">3D 模型素材與授權</h2>
                    <p>本平台中使用的部分 3D 模型素材來自以下開放授權平台，僅作為視覺呈現之用：</p>
                    <ul className="list-disc px-5">
                        <li>Wind turbine by Poly by Google [CC-BY] (<a href="https://creativecommons.org/licenses/by/3.0/" className="text-blue-600">https://creativecommons.org/licenses/by/3.0/</a>) via <a className="text-blue-600" href="https://poly.pizza/m/8Tke6WIyZtg">Poly Pizza</a></li>
                        <li>Solar Panel Structure by <a href="https://poly.pizza/m/snXloZEimW" className="text-blue-600">Quaternius</a></li>
                        <li>
                            Factory by Poly by Google [CC-BY] (<a href="https://creativecommons.org/licenses/by/3.0/" className="text-blue-600">https://creativecommons.org/licenses/by/3.0/</a>) via <a href="https://poly.pizza/m/fiTYyyiZXqF" className="text-blue-600">Poly Pizza</a> 
                        </li>
                    </ul>
                </div>
                <div className="mt-2">
                    <h2 className="text-base md:text-lg font-semibold text-gray-600 mb-2">開發者資訊</h2>
                    <ul className="list-disc px-5">
                        <li>GitHub:<a href="https://github.com/t1123425" className="text-blue-600">Tom Yuan</a></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}