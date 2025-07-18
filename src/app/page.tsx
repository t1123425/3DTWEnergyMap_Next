'use client';
import {PowerAreaDropdownSelector,RnewEnegryTypeTabs} from '@/app/components/widgets/index'
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const currenMapType = searchParams.get('mapType') ?? 'twp';

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
