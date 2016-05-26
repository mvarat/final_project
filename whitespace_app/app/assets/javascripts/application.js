// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

console.log("loaded");
//
var myApp = angular.module("MyApp", [] );

myApp.controller("WelcomeController", ["$scope", "$http", function( $scope, $http){

console.log("controller");

  var req = {
    method: 'GET',
    url: 'https://api.artsy.net/api/artworks/516dfb9ab31e2b2270000c45',
    // url: 'https://api.artsy.net/api/artists?sample',
    headers: {
      'X-Xapp-Token': "JvTPWe4WsQO-xqX6Bts49ps5s1UNlgFuRyMu0_534R3rKyfFipTxOYj4DUNubvaJkHh7aChVoP7upBNet1lIjlcTbAbRFdWIdweHuyyUHr-zOwCQZczTEVBKOZpNuI6IkUux3e9qvm-_l7WBRueLaRMLt3POjkTx7KwPn5vSzWX597R-JtU0AdiCAq1V_yVnGxs1YWsmhPFYD9-5Fo4Au-70elyRUdpvwWUfDWXFBU8="
    }
  }

  $scope.getArtwork = function () {
    console.log("trying to get art");
    $http(req).then(function(response){
      console.log(response.data);
      console.log(response.data.date);
      console.log(response.data._links.thumbnail.href);
      $scope.tnImage = response.data._links.thumbnail.href;
      $scope.emptyImageURL = response.data._links["image:self"].href;
      $scope.imageURL = $scope.emptyImageURL.replace("{?image_version}", "/large");
      console.log($scope.imageURL);
      $scope.year = response.data.date;
      $scope.artist = response.data._links.artists.href;
      $scope.getArtist();
    });
  }

  $scope.getArtist = function () {

    var artistReq = {
      method: 'GET',
      url: $scope.artist,
      headers: {
        'X-Xapp-Token': "JvTPWe4WsQO-xqX6Bts49ps5s1UNlgFuRyMu0_534R3rKyfFipTxOYj4DUNubvaJkHh7aChVoP7upBNet1lIjlcTbAbRFdWIdweHuyyUHr-zOwCQZczTEVBKOZpNuI6IkUux3e9qvm-_l7WBRueLaRMLt3POjkTx7KwPn5vSzWX597R-JtU0AdiCAq1V_yVnGxs1YWsmhPFYD9-5Fo4Au-70elyRUdpvwWUfDWXFBU8="
      }
    }

    console.log(artistReq);
    $http(artistReq).then(function(response){
      console.log(response);

    });
  }

}])
