const isDev = process.env.NODE_ENV === 'development'
const PORT = process.env.PORT || 3000

describe('afvalkalender', () => {
  beforeAll(async () => {
    if (isDev) {
      await page.goto(`http://localhost:${PORT}/`)
    } else {
      await page.goto('https://afvalkalender.appspot.com/')
    }
  })

  it('should display "google" text on page', async () => {
    await expect(page).toMatch('afvalkalender')
  })
})
