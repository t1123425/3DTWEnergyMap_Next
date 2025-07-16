import {  useThree } from "@react-three/fiber";
import { useRef,useEffect,useMemo, type FC, useState } from "react"
import { Group} from 'three'
import { mainStore } from "@/store/index";
import { type SVGResult } from "three/examples/jsm/Addons.js";
import Area from "@/app/components/map/area/index";
import * as THREE from "three";

type MapColorObj = {
    [key:string]:string
}
const colorObj:MapColorObj = {
    North:'blue',
    Central: 'purple',
    East: 'orange',
    South: 'green'
}

type PowerMapProp = {
    svgData:SVGResult
}

const mapCenter = new THREE.Vector3()
const TWPowerMap:FC<PowerMapProp> = ({svgData}) => {
    const taiwanGIS = mainStore(state => state.taiwanGIS);
    //const [mapArray,setMayArray] = useState<THREE.Vector3[]>([]);
    const currentAreaData = mainStore(state => state.currentAreaData);
    const groupRef = useRef<Group| null>(null);
    const EffectRan = useRef(false);
    const {camera } = useThree();
    const box = new THREE.Box3();
    const initalCityDataArray = mainStore(state => state.initalCityDataArray);
    const setCurrentSelectCity = mainStore(state => state.setCurrentSelectCity);
    const powerDataArray = mainStore(state => state.powerDataArray);
    const powerData = useMemo(()=>{
       
        return svgData.paths.map((path) => {
            //找出地圖上各gis
            const gis = taiwanGIS.find(e => e.cityId === path.userData?.node.id)
            //設定選出區域顏色
            let areaColor = gis?.area ? colorObj[gis.area] : '';
            //確認已被選取區域
            const isHover = currentAreaData?.area === gis?.area;
            let ShowInfoType = ''
            let infolist:string[] = [];
            const cityData = {
                name:gis?.ch_name ?? '',
                cityId:gis?.cityId ?? ''
            }
            /**
             * 用電量訊息欄北中南東預設城市位置
             * TWTPE - 台北
             * TWTXG - 台中
             * TWKHH - 高雄
             * TWHUA - 花蓮
             */
            if((gis?.cityId === 'TWTPE' || 
               gis?.cityId === 'TWTXG' || 
               gis?.cityId === 'TWKHH' || 
               gis?.cityId === 'TWHUA' ) && path.userData?.node.nodeName === 'path'){
             
                const getTaiwanPowerData = powerDataArray.find(e => gis?.area === e.area)
                const rawDate = getTaiwanPowerData?.date;
                areaColor = gis?.area ? colorObj[gis.area] : '';
                let dataDate = ''
                if(rawDate){
                    const year = rawDate.slice(0, 4);
                    const month = rawDate.slice(4, 6);
                    const day = rawDate.slice(6, 8);
                    dataDate = year+'-'+month+'-'+day;
                }
                
                ShowInfoType = 'power'

                infolist = [
                    '統計時間:'+ dataDate,
                    '發電量:'+getTaiwanPowerData?.powerGen,
                    '用電量:'+getTaiwanPowerData?.powerConsumption]
            }
             return {
                    shape:path,
                    areaColor,
                    isHover,
                    ShowInfoType,
                    infolist,
                    cityData
                }
            
        })
        // 
    },[svgData,taiwanGIS,currentAreaData,powerDataArray]) 
    
    useEffect(()=>{
        if(EffectRan.current && groupRef.current){
            groupRef.current.rotateX((Math.PI)- 45);
            groupRef.current.rotateZ(Math.PI/8);
            box.setFromObject(groupRef.current)
            box.getCenter(mapCenter)
            groupRef.current.position.sub(mapCenter)// 將 group 移動，讓中心在 (0,0,0)
            camera.lookAt(mapCenter);
            const defaultCityData = {
                cityId:'',
                city:'',
                pos:new THREE.Vector3(0,3,450),
            }
            //camera.position.z = 850;
            initalCityDataArray();
            setCurrentSelectCity(defaultCityData);
        }
         return ()=>{
            EffectRan.current = true;
        }
       
    },[])
    
    return (
         <group ref={groupRef}>
            {
                powerData.map((data,i)=> (
                        <Area key={i} 
                            shape={data.shape}
                            areaColor={data.areaColor}
                            isHover={data.isHover}
                            ShowInfoType={data.ShowInfoType}
                            infoList={data.infolist}
                            cityData={data.cityData}
                         />
                ))
            }
        </group>
       
    )
}
export default TWPowerMap;