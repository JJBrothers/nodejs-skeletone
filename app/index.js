const express             = require('express');
const exphbs              = require('express-handlebars');
const bodyParser          = require('body-parser');
const app                 = express();
const authJWT             = reqlib("/app/api/midlwr/auth/jwt");
const conf                = reqlib("/app/conf");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(authJWT.initialize());
//app.use(authJWT.authenticate().unless({path: conf.auth.excludeUrl}));
app.use(
  authJWT.authenticate().unless({path: conf.auth.excludeUrl})
  ,(req,res,next) => {
    req.prop = Object.assign(req.query||null, req.body||null, req.user||null);
    console.log('request property => '+JSON.stringify(req.prop));
    next();
});

//cross doamin handling
app.use((req, res, next)=>{
  //http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/swgr', reqlib('/app/api/doc/swgr/swgr.router'));
app.use('/api/smpl', reqlib('/app/api/smpl/smpl.router'));

//비밀번호찾기 페이지
//http://expressjs.com/ko/guide/using-template-engines.html
//app.set('views', ...) 는 express 자체의 views 디렉토리안에 컨트롤러로 접근할수있는 static 파일을 넣겠다  //중요 ...
app.set('views',require('app-root-path').path+ '/app/page');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use('/page', reqlib('/app/page/page.ctrl'));

app.use((err, req, res, next) => {
  res.status(500).send({
    statusCode:500,
    isSuccess:false,
    data:err.message
  });
});

module.exports = app;
