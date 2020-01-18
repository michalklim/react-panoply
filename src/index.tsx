import React, { Children, FunctionComponent, ReactNode, CSSProperties, useState } from 'react'

import { REACT_PANOPLY_CLASS, REACT_PANOPLY_WRAPPER_CLASS } from './constants'

export interface ReactPanoplyParams {
  slidesSpacing: number
  slidesPerView: 'auto' | number
  initialSlide: number
  loop: boolean
}

export interface ReactPanoplyParsedParams extends ReactPanoplyParams {
  slidesPerView: number
}

export interface ReactPanoplyProps {
  className?: string
  children?: ReactNode
  params?: Partial<ReactPanoplyParams>
  wrapperClass?: string
}

export interface ReactPanoplyState {
  activeSlideIndex: number
}

type GetCarouselWrapperStyles = (
  slidesLength: number,
  params: ReactPanoplyParsedParams,
  activeSlideIndex: number,
) => CSSProperties

const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num)

const getCarouselWrapperStyles: GetCarouselWrapperStyles = (slidesLength, params, activeSlideIndex) => {
  const { slidesSpacing, slidesPerView } = params
  const gridWrapperPercentWidth = (slidesLength * 100) / slidesPerView
  const gridSlidesSpacingOffset = slidesSpacing * ((gridWrapperPercentWidth - 100) / 100)
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${slidesLength}, 1fr)`,
    gridTemplateRows: `1fr`,
    gridColumnGap: slidesSpacing,
    width: `calc(${gridWrapperPercentWidth}% + ${gridSlidesSpacingOffset}px)`,
    transform: `translateX(-${(activeSlideIndex * 100) / slidesLength}%)`,
    transition: 'transform 300ms',
  }
}

const defaultParams: ReactPanoplyParams = {
  slidesSpacing: 10,
  slidesPerView: 'auto',
  initialSlide: 1,
  loop: false,
}

const defaultState: ReactPanoplyState = {
  activeSlideIndex: 0,
}

const nextSlide = (setActiveSlideIndex, params, slidesLength) => {
  if (params.loop) {
    setActiveSlideIndex(prev => prev + 1)
  } else {
    setActiveSlideIndex(prev => clamp(prev + 1, 0, slidesLength - params.slidesPerView))
  }
}

const prevSlide = (setActiveSlideIndex, params, slidesLength) => {
  if (params.loop) {
    setActiveSlideIndex(prev => prev - 1)
  } else {
    setActiveSlideIndex(prev => clamp(prev - 1, 0, slidesLength - params.slidesPerView))
  }
}

const ReactPanoply: FunctionComponent<ReactPanoplyProps> = ({
  children,
  className = REACT_PANOPLY_CLASS,
  params = {},
  wrapperClass = REACT_PANOPLY_WRAPPER_CLASS,
}) => {
  const slidesLength = Children.count(children)
  const mergedParams = { ...defaultParams, ...params }
  const parsedParams = {
    ...mergedParams,
    slidesPerView: mergedParams.slidesPerView === 'auto' ? slidesLength : mergedParams.slidesPerView,
  }

  const [activeSlideIndex, setActiveSlideIndex] = useState(params.initialSlide ?? defaultState.activeSlideIndex)
  const wrapperStyles = getCarouselWrapperStyles(slidesLength, parsedParams, activeSlideIndex)

  return (
    <div style={{ width: '100%', overflow: 'hidden' }} className={className}>
      <div style={wrapperStyles} className={wrapperClass}>
        {children}
      </div>

      <button onClick={() => prevSlide(setActiveSlideIndex, parsedParams, slidesLength)}> prev </button>
      <button onClick={() => nextSlide(setActiveSlideIndex, parsedParams, slidesLength)}> next </button>
    </div>
  )
}

export default ReactPanoply
