const Promise                   = require('bluebird');
const queryHelper               = reqlib('/app/util/queryHelper/mysql');
const smplSql                   = reqlib('/app/model/sql/smpl.sql');
const mail                      = reqlib('/app/util/mail');

const sendMail = (req, res, next) => {
  let receiver = {
    to : 'mjhp6835@naver.com',
    subject : 'test subject',
    text : 'test body'
  }
  mail.sendMail(receiver).then(() =>{
    console.log('메일발송성공');
    res.status(200).send({
      statusCode:200,
      isSuccess:true,
      data:{
        msg : 'sucess send mail'
      }
    })
  }).catch((err)=> {
    next(new Error(err));
  })
};

const select =  (req, res, next) => {
  let rsc = {query : smplSql.select, data : {col1 : 'row1_col1', col5: 'a'}, expect : 'single'};
  queryHelper.execute(rsc).then(rst => {
    res.status(200).send({
      statusCode:200,
      isSuccess:true,
      data: rst
    });
  }).catch(err =>{
    next(new Error(err));
  })
}

const transaction = (req, res, next) => {
  // id 값을 이미있는 id 값을 주면 rollback 됨 ex) id : 1
  queryHelper.transaction(
    [
      {query : smplSql.transaction, data : {id : null, col1 : 'a', col2 : 'b', col3 : 'c',col4 : 'd',col5 : 'e'}, expect : 'single'}
      , {query : smplSql.transaction, data : {id : null, col1 : 'a', col2 : 'b', col3 : 'c',col4 : 'd',col5 : 'e'}, expect : 'single'}
      , {query : smplSql.transaction, data : {id : null, col1 : 'a', col2 : 'b', col3 : 'c',col4 : 'd',col5 : 'e'}, expect : 'single'}
    ]
  ).then(rst => {
    res.status(200).send({
      statusCode:200,
      isSuccess:true,
      data: rst
    });
  }).catch(err =>{
    next(new Error(err));
  })
};

const nested = (req, res, next) => {
  Promise.resolve(true).then(()=>{
    return queryHelper.execute({query : smplSql.select, data : {col1 : 'row1_col1', col5: 'a'}, expect : 'single'})
  }).then((rst) => {
    return queryHelper.execute({query : smplSql.select2, data : {id : rst.id}, expect : 'single'})
  }).then((rst) => {
    res.status(200).send({
      statusCode:200,
      isSuccess:true,
      data: rst
    });
  })
  .catch((err) => {
    next(new Error(err));
  })
};

const spread = (req, res, next) => {
  const prms1 = queryHelper.execute({query : smplSql.select, data : {col1 : 'row1_col1', col5: 'a'}, expect : 'single'})
  const prms2 = prms1.then((rst) => { return queryHelper.execute({query : smplSql.select3, data : {sample_id : rst.id}, expect : 'many'})});
  //Promise.all 사용해도되나, 순서보장을위해 mapSeries 사용함
  Promise.mapSeries([prms1,prms2],(prms) => {return prms}).spread((rst1, rst2) => {
    rst1.sub = rst2;
    res.status(200).send({
      statusCode:200,
      isSuccess:true,
      data: rst1
    });
  }).catch((err) => {
    next(new Error(err));
  })
};

const validation = (req, res, next) => {
  res.status(200).send({
    statusCode:200,
    isSuccess:true,
    data: {
      msg : 'email is available !'
    }
  });
};

const findPasswd = (req, res, next) => {
  queryHelper.execute({query : mbrQuery.findPasswd, data : req.prop, expect:'single' }).then(rst =>{
    if(!rst) return Promise.resolve({resultCode : '002', msg : 'not found member'});
    let receiver = {
      to : rst.email,
      subject : '비밀번호 변경안내',
      text : `
        <h3>비밀번호 변경 url을 보내드립니다</h3>
        <a href="https://${process.env.HOME_SERVER_HOST}/page/findPasswd/?token=${jwt.sign({ email:rst.email }, conf.auth.secret, { algorithm: conf.auth.algorithm})}" target="_blank">비밀번호 변경하기</a>
        <h4>해당 url에 접속을하여 비밀번호를 변경하시기 바랍니다</h4>
      `
    }
    return mail.sendMail(receiver).then(() =>{
      return queryHelper.execute({query : mbrQuery.updatePubCngPwMail, data : {flag:'Y', email : rst.email} })
    }).then(rst => {
      console.log(JSON.stringify(rst) + ' update result');
      if(rst.affectedRows === 1) return Promise.resolve({resultCode : '001', msg : 'sent email, check email'});
      else return Promise.resolve({resultCode : '002', msg : 'error'});

    })
  })
  .then(rst => {
    res.status(200).send({
      statusCode:200,
      isSuccess:true,
      data:{
        msg : rst
      }
    })
  })
  .catch(err => {
    next(new Error(err));
  })
};

//http://stackoverflow.com/questions/28250680/how-do-i-access-previous-promise-results-in-a-then-chain
//http://bluebirdjs.com/docs/api-reference.html
//http://bluebirdjs.com/docs/api/promise.join.html

module.exports = {
  sendMail,
  select,
  transaction,
  nested,
  spread,
  validation,
  findPasswd
};
