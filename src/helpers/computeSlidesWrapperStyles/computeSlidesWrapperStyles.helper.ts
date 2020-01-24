import { ComputeSlidesWrapperStylesHelper } from './types'
// ${((activeSlideIndex * 100) + (gridWrapperPercentWidth)) / slidesLength}%
const computeSlidesWrapperStyles: ComputeSlidesWrapperStylesHelper = (slidesLength, params, activeSlideIndex) => {
  const { slidesSpacing, slidesPerView } = params
  const gridWrapperPercentWidth = (slidesLength * 100) / slidesPerView
  const gridSlidesSpacingOffset = slidesSpacing * ((gridWrapperPercentWidth - 100) / 100)
  const translateValue = params.centerActiveSlide
    ? `calc(-${(activeSlideIndex * 100) / slidesLength}% + ${gridWrapperPercentWidth / slidesLength}%)`
    : `-${(activeSlideIndex * 100) / slidesLength}%`

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${slidesLength}, 1fr)`,
    gridTemplateRows: `1fr`,
    gridColumnGap: slidesSpacing,
    width: `calc(${gridWrapperPercentWidth}% + ${gridSlidesSpacingOffset}px)`,
    transform: `translateX(${translateValue})`,
    transition: 'transform 300ms',
  }
}

export default computeSlidesWrapperStyles
