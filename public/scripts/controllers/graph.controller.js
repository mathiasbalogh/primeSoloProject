app.controller('GraphController', function(DefaultService, $location){
    console.log('GraphController is loaded');

var graph = this;


graph.getChartData = function(){
  DefaultService.getChartData().then(function(res){
    var responseArray = res.data;
    responseArray = responseArray.reverse();
    responseArray.forEach(function(i){
      var date = new Date(i.date);
      date = date.toISOString().substr(0,10);
      graph.labels.push(date);
      graph.data[0].push(i.rating);
    });
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

});
