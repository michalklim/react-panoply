import { ReactPanoplyParams } from '../../constants/defaultParams'

export interface ReactPanoplyParsedParams extends ReactPanoplyParams {
  slidesPerView: number
}

export type ParseParamsHelper = (params: ReactPanoplyParams, slidesLength: number) => ReactPanoplyParsedParams
