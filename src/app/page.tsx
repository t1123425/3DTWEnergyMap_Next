'use client';
import {PowerAreaDropdownSelector,RnewEnegryTypeTabs} from '@/app/components/widgets/index'
import { useSearchParams } from 'next/navigation';

type MapType = "twp" | "rnest";

export default function Home() {
  const searchParams = useSearchParams();
  const currenMapType = searchParams.get('mapType') ?? 'twp' as MapType;

  return (
    <>
       {
          currenMapType === 'rnest' &&  <RnewEnegryTypeTabs />
        }
        {
          currenMapType === 'twp' && <PowerAreaDropdownSelector />
        }
    </>
   
  )  
}
