import { ChangeSlide, GetNextIndex } from './types'

import clamp from '../../utils/clamp'

const changeSlide: ChangeSlide = (direction, setActiveSlideIndex, params, slidesLength) => {
  const getNextIndex: GetNextIndex = prevState => (direction === 'prev' ? prevState - 1 : prevState + 1)

  if (params.loop) {
    setActiveSlideIndex(prevState => getNextIndex(prevState))
  } else if (params.centerActiveSlide) {
    setActiveSlideIndex(prevState => clamp(getNextIndex(prevState), 0, slidesLength - 1))
  } else {
    setActiveSlideIndex(prevState => clamp(getNextIndex(prevState), 0, slidesLength - params.slidesPerView))
  }
}

export default changeSlide
