/**
 * Module exports.
 * @public
 */
exports.sendMail = sendMail;

/**
 * Module dependencies.
 * @private
 */
const nodemailer              = require('nodemailer');
const conf                    = reqlib('/app/conf');

/**
 * SMTP 메일발송 객체 생성
 * @return {Transporter} SMTP 메일발송 객체
 * @private
 */
function createTransport(){
  return nodemailer.createTransport(
    `smtps://${conf.mailSender.mailId}
    :${conf.mailSender.passwd}
    @smtp.${conf.mailSender.smtpDomain}`
  );
}

/**
* 메일발송
* @param {JSON}  수취인정보(to,subject,text)
* @return {Promise} 메일전송결과
* @public
*/
function sendMail(receiver){
  return new Promise((resolve, reject) => {
    let transporter = createTransport();
    transporter.sendMail({
      from: `${conf.mailSender.from} <${conf.mailSender.mailId}>`,
      to: receiver.to,
      subject: receiver.subject,
      html: '<h2>'+receiver.text+'</h2>'
    }, (err, res) => {
      if(err) reject(err)
      else resolve()
      transporter.close();
    });
  })
}

// const nodemailer              = require('nodemailer');
// const conf                    = reqlib('/app/conf');
// module.exports = (() => {
//   function createTransport(){
//     return nodemailer.createTransport(
//       `smtps://${conf.mailSender.mailId}
//       :${conf.mailSender.passwd}
//       @smtp.${conf.mailSender.smtpDomain}`
//     );
//   }
//   return {
//     sendMail : (receiver) => {
//       return new Promise((resolve, reject) => {
//         let transporter = createTransport();
//
//         transporter.sendMail({
//           from: `${conf.mailSender.from} <${conf.mailSender.mailId}>`,
//           to: receiver.to,
//           subject: receiver.subject,
//           html: '<h2>'+receiver.text+'</h2>'
//         }, (err, res) => {
//           if(err) reject(err)
//           else resolve()
//           transporter.close();
//         });
//       })
//     }
//   }
// })()
//https://www.npmjs.com/package/nodemailer
//https://support.google.com/mail/answer/78754 //보안 수준이 낮은 앱의 액세스 사용으로 해야함.
