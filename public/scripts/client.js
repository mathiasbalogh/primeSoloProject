var app = angular.module('MindSpaceApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/index.html',
    controller: 'DefaultController as defaultCtrl'
  }).when('/login', {
    templateUrl: 'views/pages/login.html'
  }).when('/register',{
    templateUrl: 'views/pages/register.html'
    // controller: 'YellowController as yellowCtrl'
  }).when('/home', {
    templateUrl: 'views/pages/home.html'
  }).when('/search', {
    templateUrl: 'views/pages/search.html'
  }).when('/emergency', {
    templateUrl: 'views/pages/emergency.html'
  });
  $locationProvider.html5Mode(true);
});

app.controller('DefaultController', function(){
  console.log('DefaultController is loaded');
});
