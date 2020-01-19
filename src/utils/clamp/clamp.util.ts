import { ClampUtil } from './types'

const clamp: ClampUtil = (num, min, max) => (num <= min ? min : num >= max ? max : num)

export default clamp
