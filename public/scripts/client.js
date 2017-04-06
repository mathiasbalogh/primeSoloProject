var app = angular.module('MindSpaceApp', ['ngRoute','chart.js',]);

app.config(function($routeProvider, $locationProvider, $controllerProvider, ChartJsProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/templates/login.html',
    controller: 'LoginController as login'
  }).when('/register',{
    templateUrl: 'views/pages/register.html',
    controller: 'RegisterController as reg',
    authRequired: true
  }).when('/home', {
    templateUrl: 'views/pages/home.html',
    controller: 'DefaultController as ctrl',
    authRequired: true
  }).when('/search', {
    templateUrl: 'views/pages/search.html',
    controller: 'FormController as form',
    authRequired: true
  }).when('/emergency', {
    templateUrl: 'views/pages/emergency.html',
    controller: 'EmergencyController as emergency',
    authRequired: true
  }).when('/form', {
    templateUrl: 'views/pages/form.html',
    controller: 'FormController as form',
    authRequired: true
  }).when('/update',{
    templateUrl: 'views/pages/update.html',
    controller: 'RegisterController as reg',
    authRequired: true
  }).when('/graph', {
    templateUrl: 'views/pages/graph.html',
    controller: 'GraphController as graph',
    authRequired: true
  }).otherwise({
    templateUrl: "views/templates/login.html",
    controller: "LoginController as login"
  });
  $locationProvider.html5Mode(true);
});

app.run(function($rootScope, $location, $route, AuthFactory) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    AuthFactory.isLoggedIn().then(function(res) {
      if (next.authRequired && res.data.status == false) {
        $location.path("/");
        $route.reload();
      }
    });
  });
});



app.controller('LoginController', function(){});

app.controller('DefaultController', function(DefaultService, AuthFactory, $location){
  console.log('DefaultController is loaded');

  var ctrl=this;

  ctrl.logOut = function(){
    AuthFactory.logout().then(function(){
      $location.path('/')
    });
  }

  ctrl.goToForm = function(){
    $location.path('/form');
  }
  ctrl.goToEmergency = function(){
    $location.path('/emergency');
  }
  ctrl.goToGraph = function(){
    $location.path('/graph');
  }
  ctrl.goToSearch = function(){
    $location.path('/search');
  }
  ctrl.goToRegister = function(){
    $location.path('/register');
  }

  ctrl.checkRegistration = function(){
    DefaultService.checkRegistration().then(function(res){
      var user = res[0];
      var nullCheck = true;
      var contactArray = user.emergency;
      if(contactArray == undefined || contactArray == null){
        nullCheck = false;
      }else{
        contactArray.forEach(function(i){
          if(i.name == null || i.phone == null){
            nullCheck = false;
          }
        });
      }
      if(user.message == null || nullCheck == false){
        console.log(user);
        $location.path('/register');
      }
    });
  }

  ctrl.checkRegistration();

  ctrl.getChartData = function(){
    DefaultService.getChartData().then(function(res){
      var responseArray = res.data;
      responseArray= responseArray.slice(0,10)
      responseArray = responseArray.reverse();
      responseArray.forEach(function(i){
        var date = new Date(i.date);
        date = date.toISOString().substr(0,10);
        ctrl.labels.push('');
        ctrl.data[0].push(i.rating);
      });
    });
  }

  ctrl.displayChart= function(){
    ctrl.getChartData();
    ctrl.labels = [];
    ctrl.series = ['Series A'];
    ctrl.data = [
      []
    ];
    ctrl.onClick = function (points, evt) {
      console.log(points, evt);
    };
    ctrl.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    ctrl.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left',
            ticks:{beginAtZero:true,
            max:10}
          }
        ]
      }
    };
  }

ctrl.displayChart();

  });
