'use client';

import { Canvas } from '@react-three/fiber'
import Navbar from '@/app/components/navbar/index';
import {mainStore} from '@/store';
import Map from '@/app/components/map/index';
import { DirectLight } from '@/app/components/lights/index';
import { useEffect } from 'react';
import  taiwanPower from '@/json/taiwanPower.json';
import {PowerAreaDropdownSelector,RnewEnegryTypeTabs} from '@/app/components/widgets/index'
export default function Home() {
  const mapMode = mainStore((state)=> state.mapMode);
  const updatePowerDataArray = mainStore((state) => state.updatePowerDataArray);
  useEffect(()=>{
    updatePowerDataArray(taiwanPower.data);
  },[updatePowerDataArray])
  return (
    <>
      <Navbar />
       {
          mapMode === 'rnest' &&  <RnewEnegryTypeTabs />
        }
        {
          mapMode === 'twp' && <PowerAreaDropdownSelector />
        }
       <main className="w-full h-screen">
           <Canvas camera={{fov:75,near:0.1,far:1000}}  fallback={<div className='text-center'>Sorry no WebGL supported!</div>}>
               <color attach="background" args={['#007FFF']} />
               <Map />
               <ambientLight color={0xffffff} intensity={0.8} />
               <DirectLight />
           </Canvas>
       </main>
    </>
   
  )  
}
