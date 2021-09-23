import useInternetSpeed from './useInternetSpeed'
import { useState } from 'react'

const cfg = {
  timesToTest: 3,
  interval: 3000,
  url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/1kb.png',
  size: 1000,
}

const getQuality = speed => {
  if (speed > 130) return 1080
  if (speed > 80) return 720
  return 480
}

function App() {
  const getSpeed = useInternetSpeed(cfg)
  const [speed, setSpeed] = useState('n/a')
  const [quality, setQuality] = useState('n/a')
  return (
    <div style={{ padding: '1em' }}>
      <p>INTERNET SPEED: {speed} kbps</p>
      <p> VIDEO QUALITY: {quality} </p>
      <button
        onClick={() => {
          const speed = getSpeed()
          console.log(speed)
          setSpeed(speed)
          setQuality(getQuality(speed))
        }}
      >
        GET SPEED
      </button>
    </div>
  )
}

export default App
