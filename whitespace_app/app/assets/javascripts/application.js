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
//= require angular-ui-bootstrap

// console.log("loaded");
var myApp = angular.module("MyApp", ["ui.bootstrap"]);

myApp.controller("ArtworksController", ["$scope", "$http", function( $scope, $http){

  $scope.artworks = [];

  $http.get('/collections/')
    .success(function(collections) {
      $scope.collections = collections;
      console.log(collections);
    });


  // get artwork from Artsy and render it
  $scope.getArtwork = function () {
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
      console.log(response);
      console.log(response.data._embedded.artists[0].name);
      $scope.artist = response.data._embedded.artists[0].name;
    });
  }

  $scope.search = function (searchTerm) {
    console.log("Search Term: " + searchTerm)
    $scope.artworks = [];
    var searchReq = {
      method: 'GET',
      url: 'https://api.artsy.net/api/search?q=' + searchTerm + '+more:pagemap:metatags-og_type:artwork',
      headers: {
        'X-Xapp-Token': "JvTPWe4WsQO-xqX6Bts49kaiUUjawqzcDLQNdKnJMlbAcMrJJNLliYs3PJ3gY8dKfMbtM9LrRSZ6PwDXPcr3msJifE32h6pS4HIdyPwXLs3_BTBzEGVTZFecuumk6rWbw7kpOZFRGJka-FbyWh-N3PZ0EMZa21jrC8sCaPQhqCSbFvDXkvosSVH6MVi9rLM0mGSw3_9PHIdiMc7Ft_6RUBAOjtg1KXLUArOOz1ncHr8="
      }
    }

    $http(searchReq).then(function(response){
      console.log("search response:");
      response.data._embedded.results.forEach(function(data){
        var newArt = {};
        newArt.thumbnailImage = data._links.thumbnail.href;
        newArt.title = data.title;
        newArt.url = data._links.self.href;
        $scope.artworks.push( newArt );
      });
      console.log($scope.artworks);
    });
  }

  // POST $http to save an artwork
  $scope.saveArt = function (art, c_id) {
    var newArtwork = {};
  var newArtwork = {
    artwork: {
      thumbnail: art.thumbnailImage,
      title: art.title,
      url: art.url,
      collection_id: c_id
    }
  }
  console.log(newArtwork);
  $http.post('/api/collections/' + newArtwork.artwork.collection_id + '/artworks', newArtwork)
    .success(function (newArtwork) {
    console.log("added artwork to collection: " + newArtwork.artworks.collection_id);
      console.log(newArtwork);
  }).then(function(){
    $scope.artwork = {};
  })
}



}])
