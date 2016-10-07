// Define the `homepageApp` module
var app = angular.module('homepageApp', ["ngRoute"]);

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

// Define the `contentController` controller on the `homepageApp` module
app.controller('ContentController', function ContentController($scope) {
  $scope.projects = [
    {
      name: "CourseMirror",
      subtitle: "an iOS app for learning rereash",
      desc: "<p>CourseMirror is a learning research project developed by <a href=\"http://mips.lrdc.pitt.edu/\">MIPS lab</a> at our Computer Science Department. I joined the team at 2015 and focused on developing CourseMirror in iOS platform. It's used to collect the feedback from students after each lecture and provide the instructors with a summrized feedback to help them improve the class quality. The project is wriiten in Objective-C and the database is on <a href=\"https://parse.com/\">Parse</a>. This is my first iOS app and it's available to download on the App store now, thanks to the help from Prof. Jingtao Wang and Xiangmin Fan.</p>",
      image: "images/coursemirror.jpg",
      url: "http://www.coursemirror.com",
      github: "https://github.com/gztong/CourseMirror_iOS",
      appstore: "https://itunes.apple.com/us/app/coursemirror-from-mips-research/id1039044798?mt=8",
      playstore: "https://play.google.com/store/apps/details?id=edu.pitt.cs.mips.coursemirror",
      demo: ""
    },
    {
      name: "Rally Dashboard",
      subtitle: "a Web app for managing defects and user stories",
      desc: "<p> This single page application uses  <a href=\"https://help.rallydev.com/access-web-services-api-wsapi\">Rally (now CA Agile) </a> Web Service API to retrive the defect and user stories data and displays them in a friendly way. It will track the most recently modified defects each day so as to bring the developers' attention. It also groups the defects by different criterions, such as owner, priority etc.At first, this dashboard is developed at ANSYS for internal usage. With the powerful binding provided by <a href=\"https://angularjs.org/\">angularJS</a>, the filter and group functions are instant, and the data are up-to-date with the rally server.</p>",
      image: "images/defectDashboard.png",
      url: "http://www.coursemirror.com",
      github: "https://github.com/gztong/Defect_Dashboard",
      appstore: "",
      playstore: "",
      demo: "/defect-dashboard-demo"
    }
  ]; 
  $scope.experiences = [
    {
      role: "Research Assistant",
      time: "Since February 2015",
      team: "Mobile Interfaces and Pedagogical Systems Group",
      location: "CS Department, Pitt",
      desc: "<ul><li>Develop CourseMirror, an iOS App intended to enhance interactions between instructors and students.</li> <li>Develop Attentive Learner, an iOS app based on Open Edx that monitoring the user’s heart rates while playing the course video.</li> <li>Analyze data and summarize the results with professor and two PhD coworkers in the group</li> </ul>",
      image: "",
      url: "http://mips.lrdc.pitt.edu/",
      github: "",
      demo: ""
    },
    {
      role: "Software Developer Co-Op",
      time: "Aug. 2015 – Dec. 2015, May 2016 – Present",
      team: "ANSYS, Inc.",
      location: "Canonsburg, PA", 
      desc: "<ul><li>Work with senior software engineers on developing ANSYS AIM® using Web and .NET technologies, such as JQuery, KnockoutJS and C#</li> <li>Redesign and construct the service and UI lawyer for AIM® in WPF.</li> <li>Develop multiple tools for other teams to improve efficiency, including a UI tool designed for the “Help” Team to visually manage XML files and a dashboard for managing defects and user stories.</li> </ul>",
      image: "",
      url: "www.ansys.com",
      github: "",
      demo: ""
    }
  ]; 
});

app.filter("trust", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);