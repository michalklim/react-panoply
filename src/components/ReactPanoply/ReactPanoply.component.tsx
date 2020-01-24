import React, { Children, FunctionComponent, useState } from 'react'

import { REACT_PANOPLY_CLASS, REACT_PANOPLY_WRAPPER_CLASS } from '../../constants'
import changeSlide from '../../helpers/changeSlide'
import defaultParams from '../../constants/defaultParams'
import parseSlides from '../../helpers/parseSlides'
import parseParams from '../../helpers/parseParams'
import computeSlidesWrapperStyles from '../../helpers/computeSlidesWrapperStyles'

import { ReactPanoplyProps } from './types'

const carouselStyles = { width: '100%', overflow: 'hidden' }

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

  const wrapperStyles = computeSlidesWrapperStyles(slidesLength, parsedParams, activeSlideIndex)
  const parsedSlides = parseSlides(activeSlideIndex, children)

  return (
    <div style={carouselStyles} className={className}>
      <div style={wrapperStyles} className={wrapperClass}>
        {parsedSlides}
      </div>

      <button onClick={() => changeSlide('prev', setActiveSlideIndex, parsedParams, slidesLength)}> prev </button>
      <button onClick={() => changeSlide('next', setActiveSlideIndex, parsedParams, slidesLength)}> next </button>
    </div>
  )
}

export default ReactPanoply
