import React, { Children, FunctionComponent, CSSProperties, useState, cloneElement } from 'react'
import cx from 'classnames'

import { REACT_PANOPLY_CLASS, REACT_PANOPLY_WRAPPER_CLASS, ACTIVE_SLIDE_CLASS } from '../../constants'
import changeSlide from '../../helpers/changeSlide'
import defaultParams from '../../constants/defaultParams'
import { ReactPanoplyParsedParams, ReactPanoplyProps } from './types'

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
  const parsedParams = {
    ...mergedParams,
    slidesPerView: mergedParams.slidesPerView === 'auto' ? slidesLength : mergedParams.slidesPerView,
    initialSlide: mergedParams.initialSlide - 1,
  }

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(parsedParams.initialSlide)
  const wrapperStyles = getCarouselWrapperStyles(slidesLength, parsedParams, activeSlideIndex)
  const parsedChildren = Children.map(children, (child, index) => {
    const className = cx(child.props.className, index === activeSlideIndex && ACTIVE_SLIDE_CLASS)
    return cloneElement(child, { className })
  })
  return (
    <div style={{ width: '100%', overflow: 'hidden' }} className={className}>
      <div style={wrapperStyles} className={wrapperClass}>
        {parsedChildren}
      </div>

      <button onClick={() => changeSlide('prev', setActiveSlideIndex, parsedParams, slidesLength)}> prev </button>
      <button onClick={() => changeSlide('next', setActiveSlideIndex, parsedParams, slidesLength)}> next </button>
    </div>
  )
}

export default ReactPanoply
