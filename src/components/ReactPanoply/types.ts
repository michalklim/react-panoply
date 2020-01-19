import { ReactPanoplyParams } from '../../constants/defaultParams'
import { ReactNode } from 'react'

export interface ReactPanoplyParsedParams extends ReactPanoplyParams {
  slidesPerView: number
}

export interface ReactPanoplyProps {
  className?: string
  children?: ReactNode
  params?: Partial<ReactPanoplyParams>
  wrapperClass?: string
}
