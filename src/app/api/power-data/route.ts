import { NextResponse } from 'next/server';
import * as Papa from 'papaparse';

interface AreaMapType {
  [key:string]:string
}
const areaNameMap:AreaMapType = {
  "﻿北部":"North",
  "﻿中部":"Central",
  "﻿南部":"South",
  "﻿東部":"East"
}

export async function GET() {

    try {
        const remoteUrl = 'https://service.taipower.com.tw/data/opendata/apply/file/d006019/001.csv';
        const res = await fetch(remoteUrl);

        if(!res.ok){
            return NextResponse.json({ error: 'Failed to fetch CSV' }, { status: 500 });
        }
        const csvText = await res.text();
        const parsed = Papa.parse(csvText,{
            header: true,
            skipEmptyLines: true,
        })
        if (parsed.errors.length > 0) {
            console.error('CSV parsing errors:', parsed.errors)
            return NextResponse.json({ error: 'CSV 格式解析失敗' }, { status: 500 })
        }
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const twPowerData = parsed.data.map((e:any) => {
          return {
            date:e['時間'],
            area:areaNameMap[e['區域']],
            areaName:e['區域'],
            powerGen:e['發電(萬瓩)'],
            powerConsumption:e['用電(萬瓩)']
          }
        })
        //console.log(twPowerData);
        return NextResponse.json(twPowerData) // 這就是陣列形式的 JSON 資料 
    } catch (err) {
        console.error('錯誤:', err)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
   
}