'use client';

import { Canvas } from '@react-three/fiber'
import {mainStore} from '@/store';
import Map from '@/app/components/map/index';
import { DirectLight } from '@/app/components/lights/index';
import { useEffect } from 'react';
import mockTaiwanPower from '@/json/taiwanPower.json';
import { useSearchParams } from 'next/navigation';

const MainCanvas = () => {
    const searchParams = useSearchParams();
      const currenMapType = searchParams.get('mapType') ?? 'twp';
    const updatePowerDataArray = mainStore((state) => state.updatePowerDataArray);

  useEffect(()=>{
    fetch('/api/power-data')
    .then(res => res.json())
    .then(data => {
      if(data && data.length){
        updatePowerDataArray(data)
      }
    }).catch((err)=>{
      console.error(err);
      updatePowerDataArray(mockTaiwanPower.data);
    })
  },[])
  return (
    <main className="w-full h-screen fixed" style={{
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: -1,
                }}>
        <Canvas camera={{fov:75,near:0.1,far:1000}}  fallback={<div className='text-center'>Sorry no WebGL supported!</div>}>
            <color attach="background" args={['#007FFF']} />
            <Map currenMapType={currenMapType} />
            <ambientLight color={0xffffff} intensity={0.8} />
            <DirectLight />
        </Canvas>
    </main>
  )
}

export default MainCanvas;