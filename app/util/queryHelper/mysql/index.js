/**
 * Module exports.
 * @public
 */
exports.execute = execute;
exports.transaction = transaction;

/**
 * Module dependencies.
 * @private
 */
const conf                = reqlib('/app/conf');
const mysql               = require('mysql');
const Promise             = require('bluebird');

/**
* pool을 생성함과동시에 connection 객체 반환
* @return {Promise} connection 객체
* @private
*/
function getConnection(){
  return new Promise((resolve, reject) => {
    mysql.createPool(conf.db).getConnection((err, connection) => {
      if(err){reject(err);return false;}
      resolve(connection);
    });
  });
};

/**
* 실제 쿼리를 수행하는 함수.
* @param {Object}     connection 객체
* @param {JSON}       {query : ,data : }
* @return {Promise}   쿼리결과 반환
* @private
*/
function doQuery(connection, resource){
  return new Promise((resolve, reject) => {
    connection.query(
      (typeof(resource.query) === 'function') ? resource.query(resource.data) : resource.query
      , (err, data) =>{
        if(err){reject(err);return false;}
        if((resource.expect||'many') === 'single'){     //default는 many로 세팅. single이 참일경우
          if(Array.isArray(data)) resolve(data[0])      //single을 기대하였으나 리스트로 나온경우 리스트의 0번쨰 인덱스를 리턴한다, 없으면 undefined임(select 쿼리시 기본적으로 []가 붙어서나옴 ... 그래서 이걸 정의했음)
          else resolve(data)      //single 을 기대하였으나 single일경우 그대로 리턴
        }else{      //manay일 경우
          if(data.length === 0) resolve(undefined)      //데이터베이스 결과값이 하나도없을경우
          else resolve(data)       //리스트를 리턴
        }
      });
    })
}

/**
* 인자갯수에 따라 재귀호출하여 쿼리를 수행
* @param {JSON}  {query : ,data : }
* @return {Promise} 쿼리결과 반환
* @public
*/
function execute(resource){
  return new Promise((resolve, reject) => {
    getConnection().then((connection) => {
      return doQuery(connection, resource).then((data) => {
        connection.release();
        resolve(data);
      }).catch((err) => {
        connection.release();
        reject(err)
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
* 트랜잭션을 수행
* @param {Array|JSON}  [{query : ,data : }]
* @return {Promise} 트랜잭션 결과 반환
* @public
*/
function transaction(resources){
  return new Promise((resolve, reject) => {
    getConnection().then((connection) => {
      connection.beginTransaction(err => {if(err){reject(err);return false;}});
      return Promise.mapSeries(resources, (resource ,index ,length) => {

        return doQuery(connection,resource);
      }).then((data) =>{
        connection.commit((err)=>{
          connection.release();
          if(err){reject(err);return false;}
          resolve(data);
        })
      }).catch((err) => {
        connection.rollback(() =>{
          connection.release();
          reject(err);
        })
      })
    }).catch((err) => {
      reject(err);
    });
  });
}

// /**
//  * Module exports.
//  * @public
//  */
// exports.execute = execute;
// exports.transaction = transaction;
//
// /**
//  * Module dependencies.
//  * @private
//  */
// const conf                = reqlib('/app/conf');
// const mysql               = require('mysql');
// const Promise             = require('bluebird');
//
// /**
// * pool을 생성함과동시에 connection 객체 반환
// * @return {Promise} connection 객체
// * @private
// */
// function getConnection(){
//   return new Promise((resolve, reject) => {
//     mysql.createPool(conf.db).getConnection((err, connection) => {
//       if(err){reject(err);return false;}
//       resolve(connection);
//     });
//   });
// };
//
// /**
// * 인자갯수에 따라 재귀호출하여 쿼리를 수행
// * @param {JSON}  {query : ,data : }
// * @return {Promise} 쿼리결과 반환
// * @public
// */
// function execute(){
//   switch(arguments.length) {
//     case 1:
//       return new Promise((resolve, reject) => {
//         getConnection().then((connection) => {
//           return this.execute(connection, arguments[0]).then((data) => {
//             connection.release();
//             resolve(data);
//           }).catch((err) => {
//             connection.release();
//             reject(err)
//           });
//         }).catch((err) => {
//           reject(err);
//         });
//       });
//       break;
//     case 2:
//       return new Promise((resolve, reject) => {
//         if(!typeof(arguments[0] === 'object')) reject();
//         if(!typeof(JSON.stringify(arguments[1]) === 'string')) reject();
//         arguments[0].query(
//           arguments[1].query(arguments[1].data)
//           //arguments[1].query
//           //,arguments[1].data
//           , (err, data) =>{
//             if(err){reject(err);return false;}
//             if(data.length == 1) resolve(data[0]);
//             else resolve(data);
//           });
//         })
//       break;
//     }
// }
//
// /**
// * 인자갯수에 따라 재귀호출, 인자갯수1(쿼리,데이터) 재귀호출하여 인자갯수2로 이동하여 쿼리
// * @param {Array|JSON}  [{query : ,data : }]
// * @return {Promise} 트랜잭션 결과 반환
// * @public
// */
// function transaction(rss){
//   return new Promise((resolve, reject) => {
//     getConnection().then((connection) => {
//       connection.beginTransaction(err => {if(err){reject(err);return false;}});
//       return Promise.mapSeries(rss, (rsc ,idx ,length) => {
//
//         return this.execute(connection,rsc);
//       }).then((data) =>{
//         connection.commit((err)=>{
//           connection.release();
//           if(err){reject(err);return false;}
//           resolve(data);
//         })
//       }).catch((err) => {
//         connection.rollback(() =>{
//           connection.release();
//           reject(err);
//         })
//       })
//     }).catch((err) => {
//       reject(err);
//     });
//   });
// }

//참고사항. 하나의 머신에서 두개의 계정git 사용하는방법을 제시함. ex git clone https://jaehunpark@gitlab.com/jaehunpark-development/nodejs-skeletone.git
//계정명을 붙임
//http://stackoverflow.com/questions/10054318/how-to-provide-username-and-password-when-run-git-clone-gitremote-git
