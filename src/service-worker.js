self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("push", function(event) {
    if (event.data) {
      var data = event.data.json();
      var notOptions = {
        body: data.notification.body,
        icon: data.notification.image || null
      };
      if (data.data) {
        console.log("dataFound");
        console.log(data.data.data);
        notOptions.actions = JSON.parse(data.data.actions);
        notOptions.data = JSON.parse(data.data.data);
      }
      event.waitUntil(
        self.registration.showNotification(data.notification.title, notOptions)
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