var ngCordovaOauth = angular.module('mainModule', ['ngCordovaOauth'])

ngCordovaOauth.controller("Oauth", function($scope, $cordovaOauth) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    $cordovaOauth.google("604556888136-venivjkdphajspototu8b1reflbg3r58.apps.googleusercontent.com"
        , ["https://www.googleapis.com/auth/drive"]).then(function(result) {

        console.log(JSON.stringify(result));
    }, function(error) {
        console.log(error);
    });

});
//
// angular.module('mainModule', ["gapi"])
//   .value('GoogleApp', {
//     apiKey: 'zyTQWpnB5KEgvmhAQyGe_hVs',
//     clientId: '604556888136-venivjkdphajspototu8b1reflbg3r58.apps.googleusercontent.com',
//     scopes: [
//       // whatever scopes you need for your app, for example:
//       'https://www.googleapis.com/auth/drive',
//       'https://www.googleapis.com/auth/youtube'
//       // ...
//     ]
// }).controller('VideosCtrl', function ($scope, Youtube) {
//     $scope.videos = Youtube.search({ part: 'snippet', q: 'Search terms' })
// });
