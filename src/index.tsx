import React, { Children, FunctionComponent, ReactNode, CSSProperties } from 'react'

export interface ReactPanoplyParams {
  slidesSpacing: number
  slidesPerView: 'auto' | number
}

export interface ReactPanoplyProps {
  className?: string
  children?: ReactNode
  params?: Partial<ReactPanoplyParams>
  wrapperClass?: string
}

type GetCarouselWrapperStyles = (slidesLength: number, slidesSpacing: number, slidesPerView: number) => CSSProperties

const getCarouselWrapperStyles: GetCarouselWrapperStyles = (slidesLength, slidesSpacing, slidesPerView) => {
  const gridWrapperWidth = (slidesLength * 100) / slidesPerView
  const gridSlidesSpacingOffset = slidesSpacing * ((gridWrapperWidth - 100) / 100)

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${slidesLength}, 1fr)`,
    gridTemplateRows: `1fr`,
    gridColumnGap: slidesSpacing,
    width: `calc(${gridWrapperWidth}% + ${gridSlidesSpacingOffset}px)`,
  }
}

const defaultParams: ReactPanoplyParams = {
  slidesSpacing: 10,
  slidesPerView: 'auto',
}

const ReactPanoply: FunctionComponent<ReactPanoplyProps> = ({
  children,
  className = 'react-panoply',
  params = {},
  wrapperClass = 'react-panoply-wrapper',
}) => {
  const mergedParams = { ...defaultParams, ...params }
  const slidesLength = Children.count(children)
  const normalizedSlidesPerView = mergedParams.slidesPerView === 'auto' ? slidesLength : mergedParams.slidesPerView
  const wrapperStyles = getCarouselWrapperStyles(slidesLength, mergedParams.slidesSpacing, normalizedSlidesPerView)

  return (
    <div style={{ width: '100%', overflow: 'hidden' }} className={className}>
      <div style={wrapperStyles} className={wrapperClass}>
        {children}
      </div>
    </div>
  )
}

export default ReactPanoply
