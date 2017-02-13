var app = angular.module('MindSpaceApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider, $controllerProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/pages/home.html',
    controller: 'DefaultController as ctrl'
  }).when('/login', {
    templateUrl: 'views/pages/login.html'
  }).when('/register',{
    templateUrl: 'views/pages/register.html'
    // controller: 'YellowController as yellowCtrl'
  // }).when('/home', {
  //   templateUrl: 'views/pages/home.html'
  }).when('/search', {
    templateUrl: 'views/pages/search.html'
  }).when('/emergency', {
    templateUrl: 'views/pages/emergency.html'
  }).when('/form', {
    templateUrl: 'views/pages/form.html',
    controller: 'FormController'
  });
  $locationProvider.html5Mode(true);
});

app.controller('DefaultController', function(){
  console.log('DefaultController is loaded');

  var ctrl=this;
  });
