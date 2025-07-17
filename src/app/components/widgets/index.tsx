import { useMemo, useState, type FC } from "react";
import type { EnergyTypesData } from "@/utils/types";
import { mainStore } from "@/store";
import RenewableEnergyStation from '@/json/RenewableEnergyStation.json';
import * as THREE from "three";

export const PowerAreaDropdownSelector:FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentAreaData = mainStore(state=> state.currentAreaData);
  const setCurrentAreaData = mainStore(state => state.setCurrentAreaData);
  const powerDataArray = mainStore(state => state.powerDataArray);
  const mapCityDataArray = mainStore(state => state.mapCityDataArray);
  const taiwanGIS = mainStore(state => state.taiwanGIS);
  const setCurrentSelectCity = mainStore(state => state.setCurrentSelectCity);
  return (
    <div className="inline-block w-48 fixed top-20 z-10 left-5">
        <button
          className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-left shadow focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {currentAreaData?.areaName ?? "請選擇地區"}
          <span className="float-right">&#9662;</span>
        </button>
        {isOpen && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 shadow">
            {powerDataArray.map((option) => (
              <li
                key={option.area}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                  currentAreaData?.area === option.area ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  const seletedGIS = taiwanGIS.find(e => e.area === option.area && ['TWTPE','TWTXG','TWKHH','TWHUA'].includes(e.cityId));
                  const zoominCityData = mapCityDataArray.find(e=> e.cityId === seletedGIS?.cityId);
                  setCurrentAreaData(option);
                  if(zoominCityData){
                    setCurrentSelectCity(zoominCityData);
                    setIsOpen(false);
                  }
                }}
              >
                {option.areaName}
              </li>
            ))}
          </ul>
        )}
    </div>

  );
};

const EnergyTypes:EnergyTypesData[] = [{
    name:'風力',
    type:'Wind'
},{
    name:'太陽能',
    type:'Solar'
},{
    name:'地熱能',
    type:'Geothermal'
}];
const EnergyTypeKey =  "能源別\/Type of Energy";
const addressTypeKey = "地址\/Address";
const nameKey = "發電站名稱\/Name of The Power Station";
const descriptionKey = '場址說明\/Description fo The Site';
const defaultCityData = {
      cityId:'',
      city:'',
      pos:new THREE.Vector3(0,3,450),
  }
export const RnewEnegryTypeTabs:FC = () => {
  const [isMenuUp,setMenuUp] = useState(false);
  const mapCityDataArray = mainStore(state => state.mapCityDataArray);
  const setCurrentSelectCity = mainStore(state => state.setCurrentSelectCity)
  const energyType = mainStore(state => state.energyType);
  const setEnergyType = mainStore(state => state.setEnergyType);
  const setCurrentTargetInfo = mainStore(state => state.setCurrentTargetInfo);
  const selectStation = (address:string) => {
    const cityData = mapCityDataArray.find(e => address.includes(e.city));
    if(cityData){
      const infoData = {
        cityId:cityData.cityId,
        info:address
      }
      setCurrentTargetInfo(infoData);
      setCurrentSelectCity(cityData);
    }

  }

  const filterEnergyStations = useMemo(()=>{
    return RenewableEnergyStation.filter(e => e[EnergyTypeKey].includes(energyType))
  },[energyType]);
  return (
    <div className={'listWrap h-full w-full fixed z-10 bg-white rounded-lg duration-300 ease-in-out md:top-20 '+(isMenuUp?'top-20':'top-[calc(100%-66px)]')} style={{maxWidth:250,maxHeight:'100%'}}>
        <div className="scrollUpBtnContent w-full flex flex-row gap-2 justify-center p-2 pb-0 border-b-1 border-gray-200  md:hidden" onClick={()=>{setMenuUp(!isMenuUp)}}>
          <span className="text-center cursor-pointer">{isMenuUp?'收合選單':'展開選單'}</span>
          {
            isMenuUp?( 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>):(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  )
          }
        </div>
        <ul className="flex flex-row gap-1 pl-0.5 pr-0.5 h-fit">
          {
            EnergyTypes.map((e,i) => <li key={i} 
                onClick={()=>{
                  setEnergyType(e.type)
                  setCurrentSelectCity(defaultCityData)
                }}
                className={'p-2 w-full text-center cursor-pointer '+(energyType === e.type?'text-blue-600 border-b-blue-600 border-b-2':'text-gray-400')}>{e.name}</li>)
          }
        </ul>
        <div className="cityList overflow-auto h-full bg-white border-t-2 border-gray-300 rounded-b-lg">
           <ul className="p-2 w-full" style={{paddingBottom:150}}>
              {
                filterEnergyStations.map((e,i)=>{
                  return (
                    <li key={i} className="w-full p-2 cursor-pointer border-b-1 border-b-gray-400"
                    onClick={()=>{
                      selectStation(e[addressTypeKey]+e[descriptionKey]);
                      setMenuUp(false);
                    }}>
                      <p>{e[nameKey]+'-'+e[descriptionKey]}</p>
                    </li>
                  )
                })
              }
           </ul>
        </div>
      </div>
    
  )
}


