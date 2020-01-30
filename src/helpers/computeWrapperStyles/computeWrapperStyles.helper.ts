import { ComputeWrapperStylesHelper } from './types'

const computeWrapperStyles: ComputeWrapperStylesHelper = (slidesLength, params, activeSlideIndex) => {
  const { slidesGap, slidesPerView } = params
  const slidesPerViewLength = slidesLength / slidesPerView
  const wrapperPercentWidth = slidesPerViewLength * 100
  const wrapperSlidesGapSum = slidesGap * (slidesPerViewLength - 1)
  const translateValue = `calc(((-100% - ${slidesGap}px) / ${slidesLength}) * ${activeSlideIndex})`
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${slidesLength}, 1fr)`,
    gridTemplateRows: `1fr`,
    gridColumnGap: slidesGap,
    width: `calc(${wrapperPercentWidth}% + ${wrapperSlidesGapSum}px)`,
    transformOrigin: 'left center',
    transform: `translateX(${translateValue})`,
    transition: 'transform 300ms',
  }
}

export default computeWrapperStyles
