//http://jsfiddle.net/joshkurz/8W2Z5/1/
angular.module('gaugeDemo', [])
.controller('gaugeDemoCtrl', ['$scope', function($scope){
    $scope.demoOptions = {
      lines: 12, // The number of lines to draw
      angle: 0.15, // The length of each line
      lineWidth: 0.44, // The line thickness
      pointer: {
        length: 0.9, // The radius of the inner circle
        strokeWidth: 0.035, // The rotation offset
        color: '#000000' // Fill color
      },
      limitMax: 'true',   // If true, the pointer will not go past the end of the gauge

      colorStart: '#6FADCF',   // Colors
      colorStop: '#8FC0DA',    // just experiment with them
      strokeColor: '#E0E0E0',   // to see which ones work best for you
      generateGradient: true,
      maxValue: 3000
    };
    
    $scope.demoValue = 1250;
}])
.directive('gaugeJs', function(){
    return {
        restrict: 'A',
        scope: {
            options:'=',
            currentValue: '='    
        },
        link: function(scope, element, attrs){
            
            var gauge;
            
            function setGauge(options){
              gauge = new Gauge(element[0]).setOptions(scope.options);
              gauge.maxValue = scope.options.maxValue; // set max gauge value
              gauge.set(scope.currentValue);
            }

            function getOptions(){
                return JSON.stringify(scope.options);
            }
            
            scope.$watch(getOptions, function(newV, oldV){
                setGauge(scope.options);
            });
                         
            scope.$watch('currentValue', function(newV,oldV){
                gauge.set(scope.currentValue); // set actual value   
            });
        }
    };
});

// <div ng-app="gaugeDemo" ng-controller="gaugeDemoCtrl">
//      <div id="preview">
//        <canvas gauge-js options="demoOptions" current-value="demoValue"></canvas>
//        <div id="preview-textfield">{{currentValue}}</div>
//      </div>

//     <form id="opts" class="opts" name="gaugeForm">
//       <h4>Options:</h4>
//       <label>Current Val:</label><input type="number" ng-model="demoValue" name="currval"><br>
//       <label>Angle:</label><input ng-model="demoOptions.angle" type="number" name="angle" min="0" max="50" step="1" ><br>
//       <label>Line width:</label><input  type="number" ng-model="demoOptions.lineWidth" name="lineWidth" min="0" max="70" ><br>
//       <label>Ptr length:</label><input  type="number" ng-model="demoOptions.pointer.length" name="pointer.length" min="0" max="100"><br>
//       <label>Ptr color:</label><input type="text" ng-model="demoOptions.pointer.color" class="color" name="pointer.color"><br>
//       <label>Ptr stroke:</label><input  type="text" ng-model="demoOptions.pointer.strokeWidth" name="pointer.strokeWidth" min="0" max="300"><br>
//       <label>Font size:</label><input type="number" ng-model="demoOptions.fontSize" name="fontSize" min="0" max="100"><br>
//       <label>Color start:</label><input type="text" ng-model="demoOptions.colorStart" name="colorStart" class="color"><br>
//       <label>Color stop:</label><input type="text" ng-model="demoOptions.colorStop" name="colorStop" class="color"><br>
//       <label>Background:</label><input type="text" ng-model="demoOptions.strokeColor" name="strokeColor" class="color"><br>
//     </form>
// </div>