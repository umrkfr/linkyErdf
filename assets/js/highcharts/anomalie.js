/**
 * Created by Amine on 01/02/2016.
 */

angular	.module("appAnomalie", [])
    .controller	( "anomlieController", ['$scope', '$interval', '$timeout', '$http'
    , function($scope,$interval,$timeout,$http,$httpProvider)
    {
        $scope.json = "";
        $scope.dateAnomalies = [];

        $scope.getTarif = function (){
        $http.get("http://localhost/api.php/anomalie").success(function (data) {

            if (data.length !== 0) {
                $scope.json = data[data.length-1].Id;
            } else {
                $scope.json = "empty data";
            }
        }).error( function (error,status) {
            $scope.data.error = { message: error, status: status};
            console.log($scope.data.error.status);
        });
        }

        $interval($scope.getTarif, 1000);

        $scope.refreshTableAnomalies = function (){
            $http.get("http://localhost/api.php/anomalie").success(function (data) {
                if (data.length !== 0) {
                    $scope.dateAnomalies.length = 0;
                    var date = $('#dateAnomalie').datepicker("getDate");
                    date = new Date(date);
                    date.setDate(date.getDate() - 1);
                    angular.forEach( data, function(value) {
                        var dateBase = new Date(value.Date);
                        if (dateBase > date) {
                            //dateBase = dateBase.getDate() + '/' + (dateBase.getMonth() + 1) + '/' +  dateBase.getFullYear();
                            $scope.dateAnomalies.push({
                                data: value,
                                date :dateBase,
                                time : dateBase.getTime()
                            });
                        }
                    });

                } else {
                    $scope.json = "empty data";
                }
            }).error( function (error,status) {
                $scope.data.error = { message: error, status: status};
                console.log($scope.data.error.status);
            });
        }
        $interval($scope.refreshTableAnomalies, 1000);
}]);