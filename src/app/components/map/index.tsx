import { useLoader,useFrame, useThree } from "@react-three/fiber";
import { FC } from "react"
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { mainStore } from "@/store/index";
import TWPowerMap from "@/app/components/map/twpower/index";
import RenewEnegryMap from "@/app/components/map/renewEnegry/index";
import * as THREE from "three";

type MapProps = {
    currenMapType:string
}
const Map:FC<MapProps> = ({currenMapType}) => {
    const svgData = useLoader(SVGLoader,'/assets/tw.svg');
    const currentSelectCity = mainStore(state => state.currentSelectCity)
    const setCurrentSelectCity = mainStore(state => state.setCurrentSelectCity);
   
    const {camera } = useThree();
    useFrame(()=>{
        if(currentSelectCity){
            const targetCameraPos = currentSelectCity.pos.clone().add(new THREE.Vector3(0,0,300));
            camera.position.lerp(targetCameraPos,0.05)

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