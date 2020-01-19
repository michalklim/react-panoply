import React, { Children, FunctionComponent, CSSProperties, useState } from 'react'

import { REACT_PANOPLY_CLASS, REACT_PANOPLY_WRAPPER_CLASS } from '../../constants'
import changeSlide from '../../helpers/changeSlide'
import defaultParams from '../../constants/defaultParams'
import { ReactPanoplyProps } from './types'
import parseSlides from '../../helpers/parseSlides'
import parseParams, { ReactPanoplyParsedParams } from '../../helpers/parseParams'

type GetCarouselWrapperStyles = (
  slidesLength: number,
  params: ReactPanoplyParsedParams,
  activeSlideIndex: number,
) => CSSProperties

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

const ReactPanoply: FunctionComponent<ReactPanoplyProps> = ({
  children,
  className = REACT_PANOPLY_CLASS,
  params = {},
  wrapperClass = REACT_PANOPLY_WRAPPER_CLASS,
}) => {
  const slidesLength = Children.count(children)
  const mergedParams = { ...defaultParams, ...params }
  const parsedParams = parseParams(mergedParams, slidesLength)

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(parsedParams.initialSlide)

  const wrapperStyles = getCarouselWrapperStyles(slidesLength, parsedParams, activeSlideIndex)
  const parsedSlides = parseSlides(activeSlideIndex, children)
  return (
    <div style={{ width: '100%', overflow: 'hidden' }} className={className}>
      <div style={wrapperStyles} className={wrapperClass}>
        {parsedSlides}
      </div>

      <button onClick={() => changeSlide('prev', setActiveSlideIndex, parsedParams, slidesLength)}> prev </button>
      <button onClick={() => changeSlide('next', setActiveSlideIndex, parsedParams, slidesLength)}> next </button>
    </div>
  )
}

export default ReactPanoply
