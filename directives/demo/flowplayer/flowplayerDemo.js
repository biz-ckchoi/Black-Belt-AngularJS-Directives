angular.module('AngularBlackBelt.demo/flowplayer', ['directives/demo/flowplayer/flowplayerDemo.tpl.html'])
.controller('flowplayerCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    var activeVideo = $location.search().activeVideo;

    $scope.videos = [
      {
        options: {
          ratio: 16/9
        },
        playlist: [
           "https://ia700701.us.archive.org/21/items/TomAndJerryInANightBeforeChristmas/TomAndJerry-003-NightBeforeChristmas1941",
           "https://ia700703.us.archive.org/5/items/TheAmericanDreamFilm-FullLength/TheAmericanDreamFilm-fullLength",
           "https://ia700404.us.archive.org/11/items/LovingYouandDrinkingBeer/LovingYouandDrinkingBeer_512kb",
           "https://ia700204.us.archive.org/23/items/Dragon_Ball_Z_Bitches/DBZBitches_512kb",
           "https://ia600302.us.archive.org/32/items/StarWarsGangsterRap/StarWarsGangstaRap_512kb"
        ]
      },
      {
        options: {
          ratio: 16/9
        },
        playlist: [
           "https://ia601903.us.archive.org/12/items/CountOfMonteChristoCanadianFilm/count%20of%20monte%20christo%20-%20canadian%20film",
           "https://ia700602.us.archive.org/29/items/Spartans/spartan_512kb",
           "https://ia600204.us.archive.org/2/items/020347/020347_512kb"
        ]
      }
    ];

    $scope.videoSearch = function(youtubeTitle) {
      return $http.jsonp("https://gdata.youtube.com/feeds/api/videos?alt=json-in-script&orderby=viewCount&start-index=11&max-results=30&v=2&callback=JSON_CALLBACK&q="+youtubeTitle).then(function(response){
        return response.data.feed.entry;
      });
    };
    
    $scope.setActiveVideo = function(index){
      $scope.activeVideo = $scope.videos[index];
      $location.search('activeVideo', index);
    };

    $scope.$watch('result', function(newV, oldV){
       if(typeof newV === 'object' && newV !== oldV){
         $scope.activeVideo = {
          filePath: $scope.result.content.src,
          template: 'directives/html5Player/youtubeHtml5Player.tpl.html',
          thumbnail: $scope.result['media$group']['media$thumbnail'][0].url.split('?')[0],
          title: $scope.result.title.$t
         };
       }
    });

    $scope.activeVideo = $scope.videos[activeVideo?activeVideo:0];
}]);