/**
 * Module exports.
 * @public
 */
exports.doValidate = doValidate;

const container  = {};

/**
* 이메일 패턴유효성 검사 수행
* @param {String} 유효성 검사대상 이메일
* @return {JSON} 검사결과반환 {isValidate : 'true|false (검사결과 적합여부)', msg : '클라이언트에게 보낼 메시지'}
* @private
*/
container.checkEmailRules = (email) => {
  const pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return {
    isValidate : pattern.test(email)
    , msg : 'please check format of email'
  }
}

/**
* 유효성검사를 수행
* @param {JSON}   ex) {파라미터이름 : {require : true, type : 'string', extra : 'checkEmailRules'},  ...  }   //get 방식의 api 요청일경우 default는 string.
* @return {express middlware}
* @public
*/
function doValidate(toCkObj){
  return (req,res,next) => {
    for (let key of Object.keys(toCkObj)) {
      console.log(typeof(req.prop[key]));
      if((toCkObj[key].require) || (!toCkObj[key].require && req.prop[key])){
        if(!req.prop[key]){next(new Error(`parameter [ ${key} ] is not exsist. please check parameter `));return false;}
        if(!(typeof(req.prop[key]) === (toCkObj[key].type||'string'))){next(new Error(`parameter [ ${key} ] is not [ ${toCkObj[key].type||'string'} ]. please check parameter `));return false;}
        if(toCkObj[key].extra){
          const result = container[toCkObj[key].extra](req.prop[key]);
          if(!result.isValidate){next(new Error(result.msg)); return false;}
        }
      }
    }
    next();
  }
}
