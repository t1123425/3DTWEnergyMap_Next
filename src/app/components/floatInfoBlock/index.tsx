import type { ReactNode } from 'react';
import type { Vector3 } from "three"
import { Html } from "@react-three/drei"
import type { FC } from "react"

type FloatInfoBlockProps = {
    position?: Vector3,
    children?: ReactNode | ReactNode[]

}
const FloatInfoBlock:FC<FloatInfoBlockProps> = ({children}) => {
    return (
        <Html as="div" position={[-80,40,0]} zIndexRange={[5, 0]} >
            <div className='infoWrap'>
                {children}
            </div>
        </Html>
    )
}

export default FloatInfoBlock