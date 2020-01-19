import { Children, cloneElement } from 'react'
import cx from 'classnames'

import { ACTIVE_SLIDE_CLASS } from '../../constants'
import { ParseSlidesHelper } from './types'

const parseSlides: ParseSlidesHelper = (activeSlideIndex, slides) =>
  Children.map(slides, (slide, index) => {
    const className = cx(slide?.props?.className, index === activeSlideIndex && ACTIVE_SLIDE_CLASS)
    return cloneElement(slide, { className })
  })

export default parseSlides
