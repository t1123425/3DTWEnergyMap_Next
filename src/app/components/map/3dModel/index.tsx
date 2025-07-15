import { useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type FC } from 'react';
import type { Mesh } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useGLTF } from '@react-three/drei'
type Props = {
    position:number[];
}

export const WindTurbine:FC<Props> = ({position}) => {
    const primitiveRef = useRef<Mesh|null>(null);
    const {scene} = useLoader(GLTFLoader,'./GLBs/WindTurbine.glb');
    const cloneScene = useMemo(()=> scene.clone(),[scene]);
    useEffect(()=>{
        if(primitiveRef.current){
            primitiveRef.current.rotateX(-Math.PI/4)
            //primitiveRef.current.position.set(position[0],position[1],position[2]);
        }
    },[])
    return (
        <primitive
         ref={primitiveRef}
         object={cloneScene} />
    )
}

type ModelProps = {
    path:string;
    rotateX?:number;
    scale?:number;
}
export const OLBModel:FC<ModelProps> = ({path,rotateX,scale}) => {
    const primitiveRef = useRef<Mesh|null>(null);
    const {scene} = useGLTF(path);
    const cloneScene = useMemo(()=> scene.clone(),[scene]);
    useEffect(()=>{
        if(primitiveRef.current && rotateX){
            if(rotateX){
                primitiveRef.current.rotateX(rotateX)
            }
            if(scale){
                primitiveRef.current.scale.set(scale,scale,scale);
            }
            primitiveRef.current.position.set(0,0,-10);
            
        }
    },[])
    return (
        <primitive
         ref={primitiveRef}
         object={cloneScene} />
    )
} 
