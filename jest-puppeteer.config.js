module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false'
  },
  server: {
    command: 'node index.js'
  }
}
