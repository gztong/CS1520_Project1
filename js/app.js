// Define the `homepageApp` module
var app = angular.module('homepageApp', ['ngRoute']);

  // configure our routes
  app.config(function($routeProvider) {
    $routeProvider
      // route for the home page
      .when('/', {
        templateUrl : 'homepage.html',
        controller  : 'ContentController'
      })

      // route for the about page
      .when('/blog', {
        templateUrl : 'partials/blog.html',
        controller  : 'ContentController'
      })
      .otherwise({redirectTo: '/'});
  });

app.factory('mainInfo', function($http) { 
    return $http.get('/data/project.json');
});

app.factory('serviceManager',function serviceManager($http, $q) {
  var serviceManager = {
    getService: function(str) {
      var deferred = $q.defer();
      var scope = this;
      $http.get(str).
      success(function(response) {
        deferred.resolve(response);
      }).error(function(){
        deferred.reject();
      });
      return deferred.promise;
    }
  }

  return serviceManager;
});

// Define the `contentController` controller on the `homepageApp` module
app.controller('ContentController', function ContentController($scope, $http, serviceManager) {
  $scope.sendMessage = function() {
         // TODO
        $http({
            method : 'POST',
            url : '/message',
            data : $scope.msg
        });
        // clean
        $scope.msg.email = "";
        $scope.msg = {};
  };

  serviceManager.getService('./data/project.json').then(function (data) {
    $scope.projects = data;
  });

  serviceManager.getService('./data/experience.json').then(function (data) {
    $scope.experiences = data;
  });
});

app.controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
  function($anchorScroll, $location, $scope) {
    $scope.gotoAnchor = function(x) {
      var newHash = x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash(x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };
  }
]);

app.filter("trust", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
