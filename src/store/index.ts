import { create } from 'zustand';
import { taiwanGis } from '@/store/gisData';
import  { type PowerData } from '@/utils/types';
import * as THREE from "three";

interface GISData{
    cityId:string,
    name:string,
    ch_name:string,
    area:string,
}

interface MapCityData {
    cityId:string,
    city:string,
    pos:THREE.Vector3
}

interface targetInfo {
    cityId:string,
    info:string
}

/**
 * map-mode
 * TWPower = twp
 * RenewableEnergyStation = rnest
 */

interface state {
    taiwanGIS:GISData[],
    mapMode:string,
    energyType:string,
    currentAreaData:PowerData | null,
    powerDataArray:PowerData[],
    currentSelectCity:MapCityData | null,
    currentTargetInfo:targetInfo | null,
    mapCityDataArray:MapCityData[],
    updateMapMode: (mode:string) => void
    setEnergyType:(type:string) => void,
    setCurrentSelectCity: (city:MapCityData | null) => void
    setCurrentTargetInfo: (info:targetInfo) => void,
    setCurrentAreaData: (data:PowerData) => void
    initalCityDataArray:() => void,
    updatePowerDataArray:(array:PowerData[]) => void,
    updateCityDataArray: (city:MapCityData) => void,
}

export const mainStore = create<state>()((set)=>({
    taiwanGIS:taiwanGis,
    mapMode:'twp',
    energyType:'Wind',
    currentAreaData:null,
    powerDataArray:[],
    currentSelectCity: null,
    currentTargetInfo:null,
    mapCityDataArray:[],
    zoomInVectors:[],
    updateMapMode: (mode) => set(()=> ({mapMode:mode})),
    setEnergyType: (type) => set(()=> ({energyType:type})),
    setCurrentSelectCity: (data) => set(()=> ({currentSelectCity:data})),
    setCurrentTargetInfo: (info) => set(()=>({currentTargetInfo:info})),
    setCurrentAreaData:(data) => set(()=> ({currentAreaData:data})),
    initalCityDataArray:()=> set(()=>({mapCityDataArray:[]})),
    updatePowerDataArray:(array) => set(()=>({powerDataArray:[...array]})),
    updateCityDataArray:(city) => set((state)=> ({mapCityDataArray:[...state.mapCityDataArray,city]})),
}))