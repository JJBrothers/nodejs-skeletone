/**
 * Module exports.
 * @public
 */
exports.initialize = initialize;
exports.authenticate = authenticate;

/**
 * Module dependencies.
 * @private
 */
const compose               = require('composable-middleware');
const jwt                   = require('jsonwebtoken');
const passport              = require("passport");
const passportJWT           = require("passport-jwt");
const conf                  = reqlib("/app/conf");
const ExtractJwt            = passportJWT.ExtractJwt;
const Strategy              = passportJWT.Strategy;
const JwtStrategy           = require('passport-jwt').Strategy
const options = {
    secretOrKey: conf.auth.secret,
    jwtFromRequest: ExtractJwt.fromHeader(conf.auth.param)
};

/**
 * authenticate()를 거쳐 인증완료후 post handle
 * @return 인증완료된 jwt payload를 호출한 controller req.user로 반환
 * @private
 */
passport.use(new JwtStrategy(options,(payload, done) => {
  //데이터베이스에서 쿼리로 토큰을 관리할시 이곳에서 로직구성하면됨.
  //jwt payload로 넘어온 데이터는 자동으로 decoded되어, 컨트롤러에서 req.user에 jwt decoded된 정보가있음.
  return done(null, payload);
}));

/**
 * passport 초기화
 * @return {Passport} passport 객체
 * @public
 */
function initialize(){
  return passport.initialize();
}

/**
 * 인증처리시 필요한 미들웨어들을 compose로 묶어서 처리
 * @return {midlwrs} compose로 묶은 미들웨어 반환
 * @public
 */
function authenticate(){
  const midlwrs =
    compose()
    .use((req,res,next) => {
      if(!req.headers[conf.auth.param]) next(new Error('empty token'));
      else if(!jwt.verify(req.headers[conf.auth.param], conf.auth.secret)) next(new Error('invalid token'));
      else next();
    })
    .use(passport.authenticate('jwt', conf.auth.session));
    midlwrs.unless = require('express-unless');
  return midlwrs;
}

// const compose               = require('composable-middleware');
// const jwt                   = require('jsonwebtoken');
// const passport              = require("passport");
// const passportJWT           = require("passport-jwt");
// const conf                  = reqlib("/app/conf");
// const ExtractJwt            = passportJWT.ExtractJwt;
// const Strategy              = passportJWT.Strategy;
// const JwtStrategy           = require('passport-jwt').Strategy
// const options = {
//     secretOrKey: conf.auth.secret,
//     jwtFromRequest: ExtractJwt.fromHeader(conf.auth.param)
// };
// module.exports = (() => {
//   passport.use(new JwtStrategy(options,(payload, done) => {
//     //데이터베이스에서 쿼리로 토큰을 관리할시 이곳에서 로직구성하면됨.
//     //jwt payload로 넘어온 데이터는 자동으로 decoded되어, 컨트롤러에서 req.user에 jwt decoded된 정보가있음.
//     return done(null, payload);
//   }));
//   return {
//     initialize: () => {
//       return passport.initialize();
//     },
//     authenticate: () => {
//       const midlwrs =
//         compose()
//         .use((req,res,next) => {
//           if(!req.headers[conf.auth.param]) next(new Error('empty token'));
//           else if(!jwt.verify(req.headers[conf.auth.param], conf.auth.secret)) next(new Error('invalid token'));
//           else next();
//         })
//         .use(passport.authenticate('jwt', conf.auth.session));
//         midlwrs.unless = require('express-unless');
//       return midlwrs;
//     }
//   };
// })();

//https://blog.jscrambler.com/implementing-jwt-using-passport/
// iss: 토큰을 발급한 발급자(Issuer)
// sub: Claim의 주제(Subject)로 토큰이 갖는 문맥을 의미한다.
// aud: 이 토큰을 사용할 수신자(Audience)
// exp: 만료시간(Expiration Time)은 만료시간이 지난 토큰은 거절해야 한다.
// nbf: Not Before의 의미로 이 시간 이전에는 토큰을 처리하지 않아야 함을 의미한다.
// iat: 토큰이 발급된 시간(Issued At)
// jti: JWT ID로 토큰에 대한 식별자이다.
//jwt.sign({ foo: 'bar' }, 'secret', { algorithm: 'HS256'});
