const router            = require('express').Router();
const auth              = reqlib('/app/api/midlwr/auth/jwt');
//const auth              = reqlib('/app/util/auth');
const conf              = reqlib('/app/conf');
var jwt                 = require('jsonwebtoken');
const mail = reqlib('/app/util/mail');

//router.use(auth.authenticate());

router.get('/loginPage', (req, res, next) => {
//router.get('/loginPage', (req, res, next) => {
  console.log('this is /login ');
  res.render('loginPage');
  //res.status(200).send({data : 'this is data '})
});

router.get('/login', (req, res, next) => {
  console.log('this is /login ');
  res.status(200).send({data : req.user})
});

router.get('/registerPage', (req, res, next) => {
  console.log('this is /register ');
  res.render('registerPage');
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0ODU2MTcxNzN9.cCJFovu2BkCvfWGOd-1uft5RaPuqBL6PjB9RfkAt59g

router.get('/register',(req, res, next) => {
  console.log('this is /register ');
  console.log(JSON.stringify(req.user)+ '<-req.user');
  //var token1 = jwt.sign({ foo: 'bar' }, 'secret', { algorithm: 'HS256'}); //iat : 발급시간, exp : 토큰만료시간 (5초후 토큰만료)
  //console.log(token1);
  let receiver = {
    to : 'mjhp6835@naver.com',
    subject : 'test subject',
    text : 'test body'
  }  
  mail.sendMail(receiver).then(() =>{
    return mail.sendMail(receiver)
  })
  .then(()=>{
    console.log('메일발송성공');
    res.json({data: req.user});
  })
  .catch((err)=> {
    next(new Error(err));
  })






  // res.json({
  //   token: jwt.sign({ id: 'jaehunpark' }, conf.jwt.secret, { algorithm: conf.jwt.algorithm})
  // });
});

//
// router.get('/:id', ctrl.get);

module.exports=router;
