const koa = require('koa');
const router = require('koa-router')()
const debug = require('debug')('next:index')
const staticFile  = require('koa-static');
//const config = require('config');
const path = require('path');
const app = koa()
const hb = require('koa-handlebars')

app.use(hb({
  defaultLayout:'main',
  layoutsDir:'view',
  viewsDir:'view'
}))


app.use(function *(next){
  const start = Date.now()
  debug('started')
  yield next
  debug('Took ${start - end} ms to load ${this.request.method} ${this.request.url}')
  const end = Date.now()
})

//router stuff
router.get('/foo/:password', function *(){
  //context --> this
  //this.request .. this.response
  //this.body = this.params.password
  const password = this.params.password
  yield this.render('msg',{
    message:password
  })
})


app.use(router.routes())
  .use(router.allowedMethods())

app.use(staticFile(path.join(__dirname + '/public')))


// app.use(function *(){
//   this.body = 'hello world'
// })

console.log('listening to port 3001');
app.listen(3001)
