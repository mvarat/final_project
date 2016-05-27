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
    url: 'https://api.artsy.net/api/artworks/515d096f7b7057eb4c002612',
    // url: 'https://api.artsy.net/api/artworks/515d12137696593fde0028d0',
    // url: 'https://api.artsy.net/api/artworks/516dfb9ab31e2b2270000c45',
    // url: 'https://api.artsy.net/api/artworks?sample',
    headers: {
      'X-Xapp-Token': "JvTPWe4WsQO-xqX6Bts49ps5s1UNlgFuRyMu0_534R3rKyfFipTxOYj4DUNubvaJkHh7aChVoP7upBNet1lIjlcTbAbRFdWIdweHuyyUHr-zOwCQZczTEVBKOZpNuI6IkUux3e9qvm-_l7WBRueLaRMLt3POjkTx7KwPn5vSzWX597R-JtU0AdiCAq1V_yVnGxs1YWsmhPFYD9-5Fo4Au-70elyRUdpvwWUfDWXFBU8="
    }
  }

  // get artwork ()
  $scope.getArtwork = function () {
    $http(req).then(function(response){
      console.log(response.data);
      // console.log(response.data.date);
      // console.log(response.data._links.thumbnail.href);
      $scope.tnImage = response.data._links.thumbnail.href;
      $scope.emptyImageURL = response.data._links["image:self"].href;
      $scope.imageURL = $scope.emptyImageURL.replace("{?image_version}", "/large");
      $scope.year = response.data.date;
      $scope.title = response.data.title;
      $scope.artistURL = response.data._links.artists.href;
      $scope.getArtist();
    });
  }

  // get artist
  $scope.getArtist = function () {
    var artistReq = {
      method: 'GET',
      url: $scope.artistURL,
      headers: {
        'X-Xapp-Token': "JvTPWe4WsQO-xqX6Bts49ps5s1UNlgFuRyMu0_534R3rKyfFipTxOYj4DUNubvaJkHh7aChVoP7upBNet1lIjlcTbAbRFdWIdweHuyyUHr-zOwCQZczTEVBKOZpNuI6IkUux3e9qvm-_l7WBRueLaRMLt3POjkTx7KwPn5vSzWX597R-JtU0AdiCAq1V_yVnGxs1YWsmhPFYD9-5Fo4Au-70elyRUdpvwWUfDWXFBU8="
      }
    }

    $http(artistReq).then(function(response){
      console.log(response.data._embedded.artists[0].name);
      $scope.artist = response.data._embedded.artists[0].name;

    });
  }

  $scope.searchArtist = function (searchTerm) {
    console.log("Search Term: " + searchTerm)
    var searchReq = {
      method: 'GET',
      url: 'https://api.artsy.net/api/search?q=' + searchTerm + '+more:pagemap:metatags-og_type:artwork',
      headers: {
        'X-Xapp-Token': "JvTPWe4WsQO-xqX6Bts49ps5s1UNlgFuRyMu0_534R3rKyfFipTxOYj4DUNubvaJkHh7aChVoP7upBNet1lIjlcTbAbRFdWIdweHuyyUHr-zOwCQZczTEVBKOZpNuI6IkUux3e9qvm-_l7WBRueLaRMLt3POjkTx7KwPn5vSzWX597R-JtU0AdiCAq1V_yVnGxs1YWsmhPFYD9-5Fo4Au-70elyRUdpvwWUfDWXFBU8="
      }
    }

    $http(searchReq).then(function(response){
      console.log("search response:");
      console.log(response.data._embedded.results);
    });
  }

}])
