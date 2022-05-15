const Koa = require('koa')
const path = require('path')
const fs = require('fs')

const app = new Koa()

app.use(async ctx => {  
  ctx.set('content-type', 'text/plain; charset=utf-8');
  ctx.set('access-control-allow-origin', '*');
  ctx.set('accept-ranges', 'bytes');

  const requestFile = ctx.request.path;
  const filePath = path.join(__dirname, "/..", requestFile);

  try{
    const fileBuffer = fs.ReadStream(filePath);
    ctx.body = fileBuffer;
  } catch(error) {
    console.log(error);
  }
});

app.listen(4000);

// run with node server.js, default port is 4000