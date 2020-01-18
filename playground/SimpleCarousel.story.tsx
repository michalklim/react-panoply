import React, { ReactNode } from 'react'
import ReactPanoply from 'react-panoply'

const slides = new Array(10).fill(0).map((item, index) => (
  <div key={index} style={{ height: 200 }}>
    slide {index + 1}
  </div>
))

const SimpleCarouselStory = (): ReactNode => {
  return (
    <ReactPanoply
      params={{
        slidesPerView: 8,
        slidesSpacing: 20,
      }}
    >
      {slides}
    </ReactPanoply>
  )
}

export default SimpleCarouselStory
