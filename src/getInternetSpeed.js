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
}

const getInternetSpeed = async (config = defaultConfig) => {
  const { timesToTest, url, size } = config
  const avgTime = await getAvgTime(timesToTest, url)
  const speed = asKbps(size, avgTime)

  console.log(`Avg. time to download ${size} bytes: ${avgTime} ms.`)
  console.log(`Avg. speed: ${speed} kbps.`)

  return speed
}

export default getInternetSpeed
