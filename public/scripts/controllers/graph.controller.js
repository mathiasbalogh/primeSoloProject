app.controller('GraphController', function(DefaultService, $location){
    console.log('GraphController is loaded');

var graph = this;
graph.responseArray=[];



graph.buildRefreshedChart = function(){
  console.log(graph.fromDate, graph.toDate);
  var toDate = graph.toDate.setHours(22,58,58);
  graph.responseArray.forEach(function(i){
    var date = new Date(i.date);
    console.log('new UTC date', date);
    if(date >= graph.fromDate && date <= toDate){
      date = date.toISOString().substr(0,10);
      console.log('trial', date);
      graph.labels.push(date);
      graph.data[0].push(i.rating);
    }
  });
}

  graph.buildChart = function(){
    console.log(graph.responseArray);
    graph.responseArray.forEach(function(i){
        var date = new Date(i.date);
        date = date.toISOString().substr(0,10);
        console.log(date);
        graph.labels.push(date);
        graph.data[0].push(i.rating);
    });
  }

  graph.getChartData = function(){
    DefaultService.getChartData().then(function(res){
      var responseArray = res.data;
      responseArray = responseArray.reverse();
      graph.responseArray = responseArray;
      console.log(graph.responseArray);
      if(graph.fromDate == null && graph.toDate == null){
        graph.buildChart();
      }else{
        graph.buildRefreshedChart();
      }
    });
  }

  graph.displayChart= function(){
    graph.getChartData();
    graph.labels = [];
    graph.series = ['Series A'];
    graph.data = [
      []
    ];
    graph.onClick = function (points, evt) {
      console.log(points, evt);
    };
    graph.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    graph.options = {
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


graph.displayChart();

graph.refreshGraph = function(){
  graph.displayChart();
}
});
