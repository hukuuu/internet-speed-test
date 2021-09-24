import useVideoQuality from './useVideoQuality'
import { useState } from 'react'

function App() {
  const [qualityRef, checkQuality] = useVideoQuality(200)

  const [quality, setQuality] = useState(qualityRef.current)

  console.log('render')

  return (
    <div style={{ padding: '1em' }}>
      <p> VIDEO QUALITY: {quality} </p>
      <button onClick={checkQuality}>CHECK QUALITY</button>
      <button onClick={() => setQuality(qualityRef.current)}>
        UPDATE QUALITY
      </button>
    </div>
  )
}

export default App
