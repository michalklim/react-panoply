import { CSSProperties } from 'react'

import { ReactPanoplyParsedParams } from '../parseParams'

export type ComputeSlidesWrapperStylesHelper = (
  slidesLength: number,
  params: ReactPanoplyParsedParams,
  activeSlideIndex: number,
) => CSSProperties
