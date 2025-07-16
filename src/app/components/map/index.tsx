import { useLoader,useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react"
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from '@react-three/drei';
import { mainStore } from "@/store/index";
import TWPowerMap from "@/app/components/map/twpower/index";
import RenewEnegryMap from "@/app/components/map/renewEnegry/index";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
// GIS來源資料如下
/**
 * 發電(萬瓩)
 * 用電(萬瓩)
 */
// type areaData = {
//     cityId:string,
//     name:string,
//     area: string,
//     ch_name: string,
//     powergen?:number,
//     powerConsumption?:number
// }
// 

const Map = () => {
    const svgData = useLoader(SVGLoader,'/assets/tw.svg');
    const mapMode = mainStore((state)=> state.mapMode);
    //const reNewEnegryStations = mainStore(state => state.mapCityDataArray);
    const currentSelectCity = mainStore(state => state.currentSelectCity)
    const setCurrentSelectCity = mainStore(state => state.setCurrentSelectCity);
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    //const [animating, setAnimating] = useState(false)
    const {camera } = useThree();
    // const targetPos = useMemo(()=>{
    //     console.log('reNewEnegryStations',reNewEnegryStations)
    //     if(reNewEnegryStations.length){
    //         const posX = reNewEnegryStations[2].pos.x;
    //         const posY = reNewEnegryStations[2].pos.y;
    //         return new THREE.Vector3(posX ,posY,400)
    //     }else{
    //         return new THREE.Vector3();
    //     }

        
    // },[currentSelectCity])
    useFrame(()=>{
        if(currentSelectCity && controlsRef.current){
            const targetCameraPos = currentSelectCity.pos.clone().add(new THREE.Vector3(0,0,300));
            camera.position.lerp(targetCameraPos,0.05)

            controlsRef.current.target.lerp(targetCameraPos,0.05);
            controlsRef.current.update()
            // 始終朝向目標地區
            camera.lookAt(currentSelectCity.pos);
            const distance = camera.position.distanceTo(targetCameraPos)
            if(distance < 1){
                //setAnimating(false)
                setCurrentSelectCity(null);
            }
        }
    })
    return (
          <>
            <OrbitControls ref={controlsRef} enableZoom={false} />
            {
                mapMode === 'twp' && <TWPowerMap svgData={svgData} />
            }
            {
                mapMode === 'rnest' && (
                    <RenewEnegryMap svgData={svgData} />
                )
            }
         </>
    )
   
}

export default Map