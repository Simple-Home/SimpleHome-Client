/* eslint-disable no-console */

import { register } from 'register-service-worker';
import firebase from "firebase/app";
import "firebase/messaging";

var startPermission = Notification.permission;
//ask for notification
if (Notification.permission === "granted") {
  const firebaseConfig = {
    apiKey: "AIzaSyBFZjXvnCMpGurSWEuVgHkE9jD9jxGJhx8",
    authDomain: "test-push-notf.firebaseapp.com",
    databaseURL: "https://test-push-notf.firebaseio.com",
    projectId: "test-push-notf",
    storageBucket: "",
    messagingSenderId: "93473765978",
    appId: "1:93473765978:web:5d959a487fe5382480f663"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

register(`service-worker.js`, {
  ready() {
    console.log(
      'App is being served from cache by a service worker.\n'
      + 'For more details, visit https://goo.gl/AFskqB',
    );

    //Ask For permission
    Notification.requestPermission(function(status) {
      console.log("Status ", status);
      if (status === "granted" && startPermission !== "granted") {
        window.location.reload();
      }
    });
  },
  registered($registration) {
    console.log('Service worker has been registered.');
    subscribeFirebase($registration);
  },
  cached() {
    console.log('Content has been cached for offline use.');
  },
  updatefound() {
    console.log('New content is downloading.');
  },
  updated(registration) {
    console.log('New content is available; please refresh.');
    document.dispatchEvent(
      new CustomEvent("swUpdated", { detail: registration })
    );
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.');
  },
  error(error) {
    console.error('Error during service worker registration:', error);
  },
});

function subscribeFirebase($registration) {
  if (Notification.permission === "granted") {
    const messaging = firebase.messaging.isSupported()
      ? firebase.messaging()
      : null;
    if (messaging != null) {
      console.log("Service worker has been registered. ", $registration);
      messaging.useServiceWorker($registration);
      messaging.usePublicVapidKey(
        "BDYQ7X7J7PX0aOFNqB-CivQeqLq4-SqCxQJlDfJ6yNnQeYRoK8H2KOqxHRh47fLrbUhC8O3tve67MqJAIqox7Ng"
      );
      messaging.getToken().then(function(token) {
        console.log("Token: ", token);
        console.log(JSON.stringify({ token: token }));

        fetch(`/vasek/home-update/api/users/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            pushtoken: token,
          }),
        })
        .then((response) => {
          return response.json();
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      });
    } else {
      // document.getElementById("sub-identifi").className =
      //   "fa fa-bell-slash-o bell";
    }
  } else {
    // document.getElementById("sub-identifi").className =
    //   "fa fa-bell-slash-o bell";
  }
}

