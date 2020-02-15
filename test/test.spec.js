const PORT = process.env.PORT || 3000
const LOCAL_URL = `http://localhost:${PORT}`
const PUBLIC_URL = 'https://afvalkalender.appspot.com'
const isDev = process.env.NODE_ENV === 'development'
const pageUrl = isDev ? LOCAL_URL : PUBLIC_URL
const SW_TARGET = 'service_worker'

describe('afvalkalender', () => {
  beforeAll(async () => {
    await page.goto(pageUrl)
  })

  it('should display "afvalkalender" text on page', async () => {
    await expect(page).toMatch('afvalkalender')
  })
})

describe('service worker', () => {
  it('should cache resources', async () => {
    const newPage = await context.newPage()
    await newPage.goto(pageUrl)
    const swTarget = await context.waitForTarget(target => {
      return target.type() === SW_TARGET
    })
    const serviceWorker = await swTarget.worker()
    const isCached = await serviceWorker.evaluate(async pageUrl => {
      return !!(await caches.match(`${pageUrl}/js/main.js`))
    }, pageUrl)
    expect(isCached).toBe(true)
  })
})
