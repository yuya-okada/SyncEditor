var ngCordovaOauth = angular.module('mainModule', ['ngCordovaOauth'])

ngCordovaOauth.controller("Oauth", function($scope, $cordovaOauth) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

console.log(
    $scope.googleLogin = function() {
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        $cordovaOauth.google("604556888136-venivjkdphajspototu8b1reflbg3r58.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            alertlog(JSON.stringify(result));
        }, function(error) {
            alertlog(error);
        });
    }
)


});
