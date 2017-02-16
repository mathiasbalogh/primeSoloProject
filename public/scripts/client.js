var app = angular.module('MindSpaceApp', ['ngRoute','chart.js']);

app.config(function($routeProvider, $locationProvider, $controllerProvider, ChartJsProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/templates/login.html',
    controller: 'LoginController as login'
  }).when('/register',{
    templateUrl: 'views/pages/register.html'
  }).when('/home', {
    templateUrl: 'views/pages/home.html',
    controller: 'DefaultController as ctrl'
  }).when('/search', {
    templateUrl: 'views/pages/search.html',
    controller: 'FormController as form'
  }).when('/emergency', {
    templateUrl: 'views/pages/emergency.html'
  }).when('/form', {
    templateUrl: 'views/pages/form.html',
    controller: 'FormController as form'
  });
  $locationProvider.html5Mode(true);
  // ChartJsProvider.setOptions({
  //   responsive:false
  // });
});

app.controller('LoginController', function(){});

app.controller('DefaultController', function(DefaultService){
  console.log('DefaultController is loaded');

  var ctrl=this;



  ctrl.getChartData = function(){
    DefaultService.getChartData().then(function(res){
      var responseArray = res.data;
      responseArray= responseArray.slice(0,10)
      responseArray = responseArray.reverse();
      responseArray.forEach(function(i){
        var date = new Date(i.date);
        date = date.toISOString().substr(0,10);
        ctrl.labels.push(date);
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
