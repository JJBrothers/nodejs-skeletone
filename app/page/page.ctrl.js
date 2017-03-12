const router              = require('express').Router();
const queryHelper         = reqlib('/app/util/queryHelper/mysql');
const jwt                 = require('jsonwebtoken');
const conf                = reqlib("/app/conf");

router.get('/findPasswd', (req, res, next) => {
  res.render('./view/findPasswd.hbs',{
    isAuthorized : true,
    email : 'jhpark1481@gmail.com',
    host : process.env.NC_SERVER_HOST
  });

  // const decoded = jwt.verify(req.prop.token, conf.auth.secret);
  //
  // queryHelper.execute({query : mbrQuery.getPubCngPwMail, data : {email : decoded.email} }).then(rst => {
  //   console.log(JSON.stringify(rst)+ '////');
  //   res.render('./view/findPasswd.hbs',{
  //     isAuthorized : rst[0].pubCngPwMail === 'Y' ? true : false,
  //     email : decoded.email,
  //     host : process.env.NC_SERVER_HOST
  //   });
  // }).catch(err => {
  //   next(new Error(err));
  // })


});

router.post('/modifyPasswd', (req, res, next) => {
  // //console.log(JSON.stringify(req.prop) + ' <- 데이터');
  // queryHelper.execute({query : mbrQuery.modifyPasswd, data : req.prop}).then(rst => {
  //   let body = {resultCode : '002',msg:'change passwd failed'};
  //   if(rst.affectedRows === 1){
  //     body.resultCode = '001'
  //     body.msg = 'chage passwd success'
  //   }
  //   res.status(200).send({
  //     statusCode:200,
  //     isSuccess:true,
  //     data:body
  //   })
  // }).catch(err => {
  //   console.log(err);
  // })
});

module.exports=router;
