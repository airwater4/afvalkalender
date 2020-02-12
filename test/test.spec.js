const isDev = process.env.NODE_ENV === 'development'
const PORT = process.env.PORT || 3000
const LOCAL_URL = `http://localhost:${PORT}/`
const PUBLIC_URL = 'https://afvalkalender.appspot.com/'
const PAGE_URL = isDev ? LOCAL_URL : PUBLIC_URL
const SW_TARGET = 'service_worker'

describe('afvalkalender', () => {
  beforeAll(async () => {
    await page.goto(PAGE_URL)
  })

  it('should display "afvalkalender" text on page', async () => {
    await expect(page).toMatch('afvalkalender')
  })
})

describe('service worker', () => {
  it('should register a service worker', async () => {
    const newPage = await context.newPage()
    await newPage.goto(PAGE_URL)
    const swTarget = await context.waitForTarget(target => {
      return target.type() === SW_TARGET
    })
  })

  it('should cache resources', async () => {
    const newPage = await context.newPage()
    await newPage.goto(PAGE_URL)

    const swTarget = await context.waitForTarget(target => {
      return target.type() === SW_TARGET
    })
    const serviceWorker = await swTarget.worker()
    const isCached = await serviceWorker.evaluate(async () => {
      const PAGE_URL = 'http://localhost:3000' // TODO get rid off harcoded value
      return !!(await caches.match(`${PAGE_URL}/js/main.js`))
    })
    expect(isCached).toBe(true)
  })
})
