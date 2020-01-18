import React from 'react'
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types'

import ReactPanoply from 'react-panoply'

const slides = new Array(10).fill(0).map((item, index) => (
  <div key={index} style={{ height: 200, background: '#f2f2f2' }}>
    slide {index + 1}
  </div>
))

const SimpleCarouselStory = (): StoryFnReactReturnType => {
  return (
    <ReactPanoply
      params={{
        slidesPerView: 3,
        slidesSpacing: 20,
      }}
    >
      {slides}
    </ReactPanoply>
  )
}

export default SimpleCarouselStory
