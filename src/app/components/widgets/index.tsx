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
                  const seletedGIS = taiwanGIS.find(e => e.area === option.area);
                  const zoominCityData = mapCityDataArray.find(e=> e.cityId === seletedGIS?.cityId);
                  //console.log('seletedGIS',seletedGIS);
                  setCurrentAreaData(option);
                  if(zoominCityData){
                    //console.log('zoominCityData',zoominCityData);
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
  const mapCityDataArray = mainStore(state => state.mapCityDataArray);
  const setCurrentSelectCity = mainStore(state => state.setCurrentSelectCity)
  const energyType = mainStore(state => state.energyType);
  const setEnergyType = mainStore(state => state.setEnergyType);
  const setCurrentTargetInfo = mainStore(state => state.setCurrentTargetInfo);
  const selectStation = (address:string) => {
    const cityData = mapCityDataArray.find(e => address.includes(e.city));
    //console.log('renew mapCityDataArray',mapCityDataArray);
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
    //const filterTypeStations = RenewableEnergyStation.filter(e => e[EnergyTypeKey].includes(energyType))
    return RenewableEnergyStation.filter(e => e[EnergyTypeKey].includes(energyType))
  },[energyType]);
  return (
    <div className="listWrap h-full w-full fixed top-20 z-10 bg-white left-5" style={{maxWidth:250}}>
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
        <div className="cityList overflow-auto h-full  border-t-2 border-gray-300">
           <ul className="p-2 w-full" style={{paddingBottom:150}}>
              {
                filterEnergyStations.map((e,i)=>{
                  return (
                    <li key={i} className="w-full p-2 cursor-pointer border-b-1 border-b-gray-400"
                    onClick={()=>{
                      selectStation(e[addressTypeKey]+e[descriptionKey]);
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


