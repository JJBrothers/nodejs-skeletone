const apn = require('apn');

function createNotication(topic, option){

  // Set up apn with the APNs Auth Key
  var apnProvider = new apn.Provider(option);

  // Prepare a new notification
  var notification = new apn.Notification();

  // Specify your iOS app's Bundle ID (accessible within the project editor)
  notification.topic = topic;

  // Set expiration to 1 hour from now (in case device is offline)
  notification.expiry = Math.floor(Date.now() / 1000) + 3600;

  // Play ping.aiff sound when the notification is received
  notification.sound = 'ping.aiff';

  function send(noti){
    // Set app badge indicator
    notification.badge = noti.badge;

    // Display the following message (the actual notification text, supports emoji)
    notification.alert = noti.alert;

    // Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
    notification.payload = {msg:noti.msg};

    // Actually send the notification
    apnProvider.send(notification, noti.deviceToken).then(function(result) {
        // Check the result for any failed devices
        console.log(result);
    });
  }

  return {
    send:send
  };
}

module.exports.createNotication = createNotication;
// var apnNoti = createNotication('com.nfox.NFIoTCosmetics');
//
// apnNoti.send({
//   alert:'제목입니다.',
//   msg:'내용입니다.',
//   deviceToken: '40d9b664e4568babe53cf3f84f75a4af4e77e711244c004104d82eaadad1bd74'
// })
