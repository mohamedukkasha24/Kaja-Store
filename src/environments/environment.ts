// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig :{
    apiKey: "AIzaSyA2Ty8NbaqgnTjrvNTOxu4V97XcGjq4y2I",
    authDomain: "kajamohaideenstore.firebaseapp.com",
    projectId: "kajamohaideenstore",
    storageBucket: "kajamohaideenstore.firebasestorage.app",
    messagingSenderId: "548786200230",
    appId: "1:548786200230:web:b238f288df959feb1d1e67",
    measurementId: "G-MB6R7S0V1N"
  },

  cloudinary: {
        cloudName: 'dmpoehrnm',
        baseUrl: 'https://res.cloudinary.com/dmpoehrnm/',
        folder: 'grocery-dev',
        uploadPreset: 'grocery',
        uploadEndpoint: 'https://api.cloudinary.com/v1_1/dmpoehrnm/auto/upload'
    },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
