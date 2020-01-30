import { CSSProperties } from 'react'

import { ReactPanoplyParsedParams } from '../parseParams'

export type ComputeWrapperStylesHelper = (
  slidesLength: number,
  params: ReactPanoplyParsedParams,
  activeSlideIndex: number,
) => CSSProperties
