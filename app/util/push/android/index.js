var FCM = require('fcm-push');

var serverKey = 'AAAA_9VriBI:APA91bGhE1ocrUkrCDlswZxcNU7IvayVsPu9HfLiIp6ukDVyPlmegN_IzRPL_CL3iEOj0tZ9mCpWMblpDkLwNeECfwp0WW6n4jG3NLijHntCzrVeMcqU_ikCWKvwVSk0ghJM6o6wSuk6';
var fcm = new FCM(serverKey);

var message = {
    to: 'czvymoYSCrY:APA91bHQHy4mEHwMVqczHDjcVz22tMMdOhf6WSSfrYgyG4S4jwhnkgu8ObSBMTi8wSvMudN1Pc6mlFh9aEqtbLlqkWTRLNo5S0ODQd6mHVUiNNjCSKboIQaXyp83-dJ8r9WkYoNCEGSG', // required fill with device token or topics
    // collapse_key: 'your_collapse_key',
    // data: {
    //     customKey: 'customVal11111'
    // },
    notification: {
        title: '타이틀',
        body: '내용'
    }
};

//promise style
fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })

//푸시발송
function sendMessage(to, msg){
  fcm.send(msg)
      .then(function(response){
          console.log("Successfully sent with response: ", response);
      })
      .catch(function(err){
          console.log("Something has gone wrong!");
          console.error(err);
      })
}
