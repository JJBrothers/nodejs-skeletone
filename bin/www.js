const rootPath        = require('app-root-path');
global.reqlib         = rootPath.require;
const https           = require('https');
//const http            = require('http');
const fs              = require('fs');
const path            = require('path');
const app             = reqlib('/app');
const conf            = reqlib('/app/conf');
const cluster         = require('cluster');
const numCPUs         = require('os').cpus().length;

//http://programmingsummaries.tistory.com/384
//https://nodejs.org/api/cluster.html
if (cluster.isMaster) {
  cluster.on('online', (worker) => {
      //console.log('생성된 워커의 아이디 : ' + worker.process.pid);
  });
  cluster.on('listening', (worker, address) => {
    console.log('created worker [ '+worker.process.pid+' ] is listening port : ' + address.port);
  });
  cluster.on('exit', (worker, code, signal) => {
    console.log('died worker id : ' + worker.process.pid);
    cluster.fork();   //워커 재생성
  });

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();   // Create a worker
  }
}else {
    // Workers share the TCP connection in this server
    //http://blog.saltfactory.net/implements-nodejs-based-https-server/
  const apiServer = https.createServer({
    key: fs.readFileSync(path.join(rootPath.path, '/app/conf/pem/ssl/key.pem')),
    cert: fs.readFileSync(path.join(rootPath.path, '/app/conf/pem/ssl/cert.pem'))
  }, app).listen(conf.port);

  apiServer.on('error', (err) => {
    throw err;
  });
  apiServer.on('listening', () => {
    let addr = apiServer.address();
    //console.log('LISTENUNG PORT : '+ addr.port);
  });
}

// //http://blog.saltfactory.net/implements-nodejs-based-https-server/
// const apiServer = https.createServer({
//   key: fs.readFileSync(path.join(rootPath.path, '/app/conf/pem/ssl/key.pem')),
//   cert: fs.readFileSync(path.join(rootPath.path, '/app/conf/pem/ssl/cert.pem'))
// }, app).listen(conf.port);
//
// apiServer.on('error', (err) => {
//   throw err;
// });
//
// apiServer.on('listening', () => {
//   let addr = apiServer.address();
//   console.log('LISTENUNG PORT : '+ addr.port);
// });
