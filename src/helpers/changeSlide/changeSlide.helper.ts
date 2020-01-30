import { ChangeSlideHelper, GetNextIndex } from './types'

import clamp from '../../utils/clamp'

const changeSlide: ChangeSlideHelper = (direction, setActiveSlideIndex, params, slidesLength) => {
  const getNextIndex: GetNextIndex = prevState => (direction === 'prev' ? prevState - 1 : prevState + 1)

  if (params.loop) {
    return setActiveSlideIndex(prevState => getNextIndex(prevState))
  }

  if (params.centerActiveSlide) {
    return setActiveSlideIndex(prevState => clamp(getNextIndex(prevState), 0, slidesLength - 1))
  }

  return setActiveSlideIndex(prevState => clamp(getNextIndex(prevState), 0, slidesLength - params.slidesPerView))
}

export default changeSlide
