const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({path: '/***', secret: '******'});
const spawn = require('child_process').spawn;

const PORT = 0000;

// Server
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(PORT);
console.log(getDate());
console.log('The service is listening', PORT);

// error
handler.on('error', function (err) {
  console.log(getDate());
  console.error('Error:', err.message)
});

// page_build
handler.on('page_build', function (event) {
  console.log(getDate());
  console.log('Received a page_build event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  runCmd('sh', ['./deploy.sh'], (text) => {
    console.log(text);
  });
});

// runCmd
function runCmd (cmd, args, callback) {
  var child = spawn(cmd, args);
  var resp = '';
  child.stdout.on('data', function (buffer) {
    resp += buffer.toString();
  })
  child.stdout.on('end', function () {
    callback(resp);
  })
}

function getDate () {
  return Date().toLocaleString();
}
