importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: "93473765978",
});

const messaging = firebase.messaging();

workbox.core.setCacheNameDetails({prefix: "simplehome-client"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener("push", function(event) {
  if (event.data) {
    var data = event.data.json();
    var notificationData = JSON.parse(data.data.notification);
    
    console.log("Recieved");
    console.log(notificationData);
    
    var Options = {
      body: notificationData.body,
      icon: 'https://dev.steelants.cz/projekty/simplehome-client/?#/' + notificationData.icon || null
    };

    //if (data) {
    //  console.log("dataFound");
    //  console.log(data);
    //  notOptions.actions = JSON.parse(data.actions);
    //  notOptions.data = JSON.parse(data.data);
    //}

    console.log(notificationData);
    event.waitUntil(
      self.registration.showNotification(notificationData.title, Options)
    );
  }
});
  
self.addEventListener("notificationclick", function(event) {

  if (event.notification) {
    if (event.notification.data) {
      var data = JSON.parse(event.notification.data.data);
      if (data[event.action]) {
        console.log(data);
        console.log(data);

        console.log(data[event.action]);
        clients.openWindow("" + data[event.action]);
      }
    }
  }
  clients.openWindow("/");
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
