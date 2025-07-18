import { useLoader,useFrame, useThree } from "@react-three/fiber";
import { FC, useRef } from "react"
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from '@react-three/drei';
import { mainStore } from "@/store/index";
import TWPowerMap from "@/app/components/map/twpower/index";
import RenewEnegryMap from "@/app/components/map/renewEnegry/index";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

type MapProps = {
    currenMapType:string
}
const Map:FC<MapProps> = ({currenMapType}) => {
    const svgData = useLoader(SVGLoader,'/assets/tw.svg');
    const currentSelectCity = mainStore(state => state.currentSelectCity)
    const setCurrentSelectCity = mainStore(state => state.setCurrentSelectCity);
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
   
    const {camera } = useThree();
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
                setCurrentSelectCity(null);
            }
        }
    })
    return (
          <>
            <OrbitControls ref={controlsRef} enableZoom={false} />
            {
                currenMapType === 'twp' && <TWPowerMap svgData={svgData} />
            }
            {
                currenMapType === 'rnest' && (
                    <RenewEnegryMap svgData={svgData} />
                )
            }
         </>
    )
   
}

export default Map