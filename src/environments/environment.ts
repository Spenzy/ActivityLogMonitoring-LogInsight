// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dataMiningAPI: "http://localhost:5000"
};

export const firebaseConfig = {
  apiKey: "AIzaSyDnuXW5vDCg_YYrVLn3MVNtYKVyMceRaSE",
  authDomain: "activitylogmonitoring.firebaseapp.com",
  databaseURL: "https://activitylogmonitoring-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "activitylogmonitoring",
  storageBucket: "activitylogmonitoring.appspot.com",
  messagingSenderId: "779549261919",
  appId: "1:779549261919:web:d3f7d5055e04e615349bea",
  measurementId: "G-JC69GG4354"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
