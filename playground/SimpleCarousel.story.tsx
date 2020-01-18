import React from 'react'
import ReactPanoply from 'react-panoply'

const slides = new Array(10).fill(0).map((item, index) => (
  <div key={index} style={{ height: 200 }}>
    slide {index + 1}
  </div>
))

const SimpleCarouselStory = () => {
  return (
    <ReactPanoply
      params={{
        slidesPerView: 5,
        slidesSpacing: 20,
      }}
    >
      {slides}
    </ReactPanoply>
  )
}

export default SimpleCarouselStory
