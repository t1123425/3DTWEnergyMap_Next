import { useRef,useEffect } from "react"
import { type DirectionalLight} from 'three'

export const DirectLight = () => {
    const lightRef = useRef<DirectionalLight | null>(null);
    //寫法參考：https://github.com/pmndrs/react-three-fiber/discussions/2791
    useEffect(()=>{
        if(lightRef.current){
            const d = 10;
            lightRef.current.position.set(20,20,20);
            lightRef.current.castShadow = true;
            lightRef.current.shadow.camera.left = -d;
            lightRef.current.shadow.camera.right = d;
            lightRef.current.shadow.camera.top = d;
            lightRef.current.shadow.camera.bottom = -d;

            //更新target 位置
            lightRef.current.target.position.set(0,0,0);
            lightRef.current.target.updateMatrixWorld();
            
        }
    },[])
    return <directionalLight ref={lightRef} color={0xffffff} intensity={4} />
}