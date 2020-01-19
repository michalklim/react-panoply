import { Dispatch, SetStateAction } from 'react'
import { ReactPanoplyParsedParams } from 'react-panoply'

export type ChangeSlide = (
  direction: 'prev' | 'next',
  setActiveSlideIndex: Dispatch<SetStateAction<number>>,
  params: ReactPanoplyParsedParams,
  slidesLength: number,
) => void
export type GetNextIndex = (prevState: number) => number
