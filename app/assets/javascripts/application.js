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

  // get the user's collections for dropdown
  $http.get('/collections/')
    .success(function(collections) {
      $scope.collections = collections;
    });

// get token from ARTSY (will not return new token)
// var xappToken = "";
//
//   // get token;
// $scope.getToken = function(){
//   $http.get('/token').then(function(response){
//     $scope.xapp = response.token
//   })
//     .send({ client_id: clientID, client_secret: clientSecret })
//     .end(function(res) {
//       xappToken = res.body.token;
//       console.log("token:");
//       console.log(xappToken);
//   });
//}

  // search for an artist by search term
  $scope.search = function (searchTerm) {
    console.log("Search Term: " + searchTerm)
    $scope.artworks = [];

    $http.get('/token').then(function(response){
      $scope.xapp = response.data.token;
      $scope.xapp = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NzkxNDU4NzYsImlhdCI6MTQ3ODU0MTA3NiwiYXVkIjoiNTc0MzZlZTI4YjNiODE0NWQ3MDAzZDE3IiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjU4MjBiZjE0Y2Q1MzBlMjdlMDAwMDAzYSJ9.a6l7pgzHeBak6x86Vs7rz7SoefITdjGr502dku23-JI";
      var searchReq = {
        method: 'GET',
        // url: artworkUrl,
        url: 'https://api.artsy.net/api/search?q=' + searchTerm + '+more:pagemap:metatags-og_type:artwork',
        headers: {
          'X-Xapp-Token': $scope.xapp
        }
      }
      // store search results in artworks [] to be rendered on search page
      $http(searchReq).then(function(response){
        // console.log("search response:");
        response.data._embedded.results.forEach(function(data){
          var newArt = {};
          newArt.thumbnailImage = data._links.thumbnail.href;
          newArt.title = data.title;
          newArt.url = data._links.self.href;
          if (newArt.thumbnailImage != "/images/icon-152.png") {
            $scope.artworks.push( newArt );
          }
        });
        // console.log($scope.artworks);
      });
    })

  }



  // POST $http to save an artwork to specified collection
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
  $http.post('/api/collections/' + newArtwork.artwork.collection_id + '/artworks', newArtwork)
    .success(function (newArtwork) {
    console.log("added artwork to collection: " + newArtwork.artworks.collection_id);
  }).then(function(){
    $scope.artwork = {};
  })
}



}])
