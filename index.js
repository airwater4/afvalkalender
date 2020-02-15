const static = require('node-static')
const http = require('http')

const PORT = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'development'
const openBrowser = process.env.OPEN_BROWSER === 'true'
const folder = new static.Server('./views')

http
  .createServer(function(request, response) {
    request
      .addListener('end', function() {
        folder.serve(request, response)
      })
      .resume()
  })
  .listen(PORT, () => {
    console.info(`Server is listening on port ${PORT}`)
    if (isDev) {
      const localUrl = `http://localhost:${PORT}`
      console.info(localUrl)
      if (openBrowser) {
        require('open')(localUrl)
      }
    }
  })
