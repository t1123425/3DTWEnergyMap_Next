'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname,useSearchParams } from 'next/navigation';
const navList = [
    {
        name:'全台用電統計',
        link:'/?mapType=twp'
    },
    {
        name:'全台再生能源電廠',
        link:'/?mapType=rnest'
    },
    {
      name:'關於',
      link:'/about'
    }
  ]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const linkActiveCheck = (link:string) => {
    if(pathname === '/'){
      const currentParam = searchParams.get('mapType');
      if(!currentParam) return  '/?mapType=twp' === link;
      return '/?mapType='+currentParam === link;
    }else{
      return pathname === link;
    }
  }
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-xl font-bold text-gray-800">
            3D台灣電力與再生能源統計地圖
          </div>
          <div className="hidden md:flex space-x-8">
            {
                navList.map((e,i) => {
                    return (
                        <span
                         key={i}
                         onClick={()=>{
                          router.push(e.link)
                         }}
                         className={'cursor-pointer hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium '+(linkActiveCheck(e.link) ? 'text-blue-600':'text-gray-700')}>
                            {e.name}
                        </span>
                    )
                })
            }
          </div>
          {/* 手機選單按鈕 */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* 手機選單內容 */}
      {menuOpen && (
        <div className="md:hidden px-2 pb-3 space-y-1">
           {
                navList.map((e,i) => {
                    return (
                        <span
                         key={i}
                         onClick={()=>{
                          router.push(e.link)
                          setMenuOpen(false);
                         }}
                         className={(linkActiveCheck(e.link) ?'text-blue-600':'text-gray-700')+' block  hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium'}>
                            {e.name}
                        </span>
                    )
                })
            }
        </div>
      )}
    </nav>
  );
};

export default Navbar;