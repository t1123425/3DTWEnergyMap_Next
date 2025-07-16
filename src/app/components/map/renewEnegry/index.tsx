import { useThree } from "@react-three/fiber";
import { useRef,useEffect,useMemo, type FC } from "react"
import { Group} from 'three'
import { type SVGResult } from "three/examples/jsm/Addons.js";
import Area from "@/app/components/map/area/index";
import * as THREE from "three";
import RenewableEnergyStation from  '@/json/RenewableEnergyStation.json'
import { mainStore } from "@/store/index";

const mapCenter = new THREE.Vector3()
type RenewMapProps = {
    svgData:SVGResult
}
/**(能源別\/Type of Energy)
 * EnergyType:
 * Wind
 * Solar
 * Geothermal
 * 
 */
const EnergyTypeKey =  "能源別\/Type of Energy";
const addressTypeKey = "地址\/Address";
const nameKey = "發電站名稱\/Name of The Power Station";
const descriptionKey = '場址說明\/Description fo The Site';
const installedCapacityKey = '裝置容量(瓩)\/Installed Capacity(kW)';

const RenewEnergyMap:FC<RenewMapProps> = ({svgData}) => {
    const groupRef = useRef<Group| null>(null);
    const EffectRan = useRef(false);
    const {camera } = useThree();
    const box = new THREE.Box3();
    const taiwanGIS = mainStore(state => state.taiwanGIS);
    const initalCityDataArray = mainStore(state => state.initalCityDataArray);
    const setCurrentSelectCity = mainStore(state => state.setCurrentSelectCity)
    const currentTargetInfo = mainStore(state => state.currentTargetInfo);
    const energyType = mainStore(state => state.energyType);

    const renewEnergyData = useMemo(()=>{
        const selectedEnergyStations = RenewableEnergyStation.filter(e => e[EnergyTypeKey].includes(energyType))
        return svgData.paths.map((path)=>{
            //找出地圖上各gis
            const gis = taiwanGIS.find(e => e.cityId === path.userData?.node.id)
            const selectedEnergyStation = selectedEnergyStations.find(e => gis?.ch_name?e[addressTypeKey].includes(gis?.ch_name):'')
            const currentSelectStation = selectedEnergyStations.find(e => e[addressTypeKey]+e[descriptionKey] === currentTargetInfo?.info)
            let ShowInfoType = ''
            let infolist:string[] = [];
            let isShowModel = false;
            let areaColor = undefined;
            const cityData = {
                name:gis?.ch_name ?? '',
                cityId:gis?.cityId ?? ''
            }
            if(path.userData?.node.nodeName === 'path' && selectedEnergyStation){
                ShowInfoType = 'renew'+energyType
                isShowModel = true;
            }
            if(currentSelectStation && currentTargetInfo?.cityId === path.userData?.node.id){
                areaColor = 'lightgreen';
                infolist = ['發電站名稱: '+currentSelectStation[nameKey],
                            '場址說明: '+currentSelectStation[descriptionKey],
                            '地址: '+currentSelectStation[addressTypeKey],
                            '裝置容量(瓩): '+currentSelectStation[installedCapacityKey]]
            }
            return {
                shape:path,
                areaColor,
                ShowInfoType,
                isShowModel,
                infolist,
                cityData
            }
        })
    },[svgData,taiwanGIS,energyType,currentTargetInfo])
 
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
            
            initalCityDataArray();
            setCurrentSelectCity(defaultCityData);
        }
         return ()=>{
            EffectRan.current = true;
        }
       
    },[])

    return (
       <group ref={groupRef} >
            {
                renewEnergyData.map((data,i)=> (
                    <Area key={i}
                        shape={data.shape}
                        ShowInfoType={data.ShowInfoType}
                        isShowModel={data.isShowModel}
                        infoList={data.infolist}
                        cityData={data.cityData}
                        areaColor={data.areaColor} />
                ))
            }
        </group> 
    )
}

export default RenewEnergyMap;
