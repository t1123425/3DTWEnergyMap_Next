import { useEffect, useMemo, useRef, type FC } from 'react';
import type { Mesh } from 'three';
import { useGLTF } from '@react-three/drei'

type ModelProps = {
    path:string;
    rotateX?:number;
    scale?:number;
}
export const OLBModel:FC<ModelProps> = ({path,rotateX,scale}) => {
    const primitiveRef = useRef<Mesh|null>(null);
    const initRef = useRef(true);
    const {scene} = useGLTF(path);
    const cloneScene = useMemo(()=> scene.clone(),[scene]);
    useEffect(()=>{
        if(primitiveRef.current && initRef.current){
            if(rotateX){
                primitiveRef.current.rotateX(rotateX)
            }
            if(scale){
                primitiveRef.current.scale.set(scale,scale,scale);
            }
            primitiveRef.current.position.set(0,0,-10);
            
        }
        return ()=>{
            initRef.current = false;
        }
    },[rotateX,scale])
    return (
        <primitive
         ref={primitiveRef}
         object={cloneScene} />
    )
} 
