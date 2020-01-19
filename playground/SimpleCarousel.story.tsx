import React from 'react'
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types'

import ReactPanoply from 'react-panoply'

const slides = new Array(10).fill(0).map((item, index) => (
  <div
    key={index}
    className="slide"
    style={{ height: 200, background: '#f2f2f2' }}
    onClick={() => {
      console.log(`I'm slide ${index}`)
    }}
  >
    slide {index + 1}
  </div>
))

const SimpleCarouselStory = (): StoryFnReactReturnType => {
  return (
    <ReactPanoply
      params={{
        slidesPerView: 5,
        slidesSpacing: 20,
        initialSlide: 1,
        centerActiveSlide: true,
      }}
    >
      {slides}
    </ReactPanoply>
  )
}

export default SimpleCarouselStory
