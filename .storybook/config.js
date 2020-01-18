import { configure } from '@storybook/react'

function loadStories() {
  require('../playground/index.tsx')
}

configure(loadStories, module)
