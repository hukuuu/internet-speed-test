import { useEffect, useRef } from 'react'

const asKbps = (bytes, millis) => (bytes * 8) / millis

const getDownloadTime = url =>
  new Promise(resolve => {
    const start = new Date().getTime()
    const img = new Image()
    img.onload = () => {
      const timeTaken = new Date().getTime() - start
      console.log(`Downloaded for ${timeTaken}`)
      resolve(timeTaken)
    }
    img.src = `${url}?t=${start}`
  })

const getAvgTime = async (timesToTest, url) => {
  const times = []
  for (let i = 0; i < timesToTest; i++) {
    times.push(await getDownloadTime(url))
  }
  return times.reduce((a, b) => a + b, 0) / times.length
}

const defaultConfig = {
  timesToTest: 3,
  url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/1kb.png',
  size: 1000,
  interval: 0,
}

const useInternetSpeed = (config = {}) => {
  const speed = useRef()
  useEffect(() => {
    const { timesToTest, url, size, interval } = { ...defaultConfig, ...config }

    let running = true
    async function calculateSpeed() {
      const avgTime = await getAvgTime(timesToTest, url)
      console.log(`Avg. time to download: ${avgTime} ms.`)
      speed.current = asKbps(size, avgTime)
      console.log(`Avg. speed: ${speed.current} kbps.`)
      //self invoke if running and if interval was given
      running && interval && setTimeout(calculateSpeed, interval)
    }

    calculateSpeed()

    return () => {
      running = false
    }
  }, [config])
  return () => speed.current
}

export default useInternetSpeed
