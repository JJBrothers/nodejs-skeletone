/**
 * Module exports.
 * @public
 */
exports.bind = bind

/**
 * Module dependencies.
 * @private
 */
const escape              = require('mysql').escape;
const replaceall          = require('replaceall');

/**
* 쿼리와 데이터를 인자값으로받아, 쿼리에 명시된 []을 replaceall하여 명시적으로 쿼리를 짜도록 유도하며,
* mysql escape사용하여 sql injection을 방어한다.
* @param {String} 순수한쿼리(바인딩명시 [])
* @param {JSON}  바인딩될 명세 {key1 : value1, key2 : value2 ...}
* @return {String} 바인딩된 쿼리 반환
* @public
*/
function bind(query, obj){
  if(!obj) return query;
  console.log(query + '  => not binded ');
  Object.keys(obj).forEach((key) => {
    query = replaceall(`[${key}]`, escape(obj[key]), query);
  })
  console.log(query + '  => binded ');
  return query;
}

//sql injection attack을 mysql.escape로 극복하도록한다
//https://github.com/mysqljs/mysql
