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
    },

    postService: function(str) {
      var deferred = $q.defer();
      var scope = this;
      $http.post(str).
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
      // check valid
      var valid = validateInput($scope.msg.name, $scope.msg.mail, $scope.msg.text);
      if(valid){
        $http({
            method : 'POST',
            url : './ajax/sendMessage.php',
            data : $scope.msg
        }).success(function(response){
            alert("Successfully sent!");
        });
        // clean
        $scope.msg = {};        
      }
  };

function validateInput(name, email, msg) {
     if (name==null || name=="",email==null || email=="",msg==null || msg=="")
      {
      alert("Please Fill All Required Field");
      return false;
      }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(email)){
      return true;
    }else{
      alert("Please Input Valid Email.");
      return false;
    }
};

  serviceManager.postService('./ajax/getData.php?table='+'projects').then(function (data) {
    $scope.projects = data;
  });
  serviceManager.postService('./ajax/getData.php?table='+'experiences').then(function (data) {
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
