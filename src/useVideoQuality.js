import { useRef } from 'react'
import getInternetSpeed from './getInternetSpeed'

const speedConfig = {
  timesToTest: 3,
  url: 'https://www.google.com/images/phd/px.gif',
  size: 64,
}

const THRESHOLD_1080 = 5
const THRESHOLD_720 = 2

const useVideoQuality = defaultQuality => {
  const quality = useRef(defaultQuality)

  const checkQuality = async () => {
    const speed = await getInternetSpeed(speedConfig)
    if (speed > THRESHOLD_1080) quality.current = 1080
    else if (speed > THRESHOLD_720) quality.current = 720
    else quality.current = 480
  }

  return [quality, checkQuality]
}

export default useVideoQuality
