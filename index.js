const static = require('node-static');
const http = require('http')

const PORT = process.env.PORT || 3000

const file = new static.Server('./views');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();    
}).listen(PORT, () => console.info(`Server is listening on port ${PORT}`));
