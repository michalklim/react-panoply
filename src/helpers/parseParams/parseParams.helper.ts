import { ParseParamsHelper } from './types'

const parseParams: ParseParamsHelper = (params, slidesLength) => {
  return {
    ...params,
    slidesPerView: params.slidesPerView === 'auto' ? slidesLength : params.slidesPerView,
    initialSlide: params.initialSlide - 1,
  }
}

export default parseParams
