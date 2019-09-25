var _printData;
var transmittingData = function (data) {
    if(data){
        _printData = data;
    }
};

require.config({
    baseUrl:'',
    paths: {
        'jquery':'../../../../lib/jquery/jquery.min',
        'angular':'../../../../lib/angular/angular1.2.20',
        'codes':'../../../../mock/data/codes.dev',
        'ptcode':'../../../../widgets/mc.pt.code'
    },
    shim: {
        'jquery':{
            exports:'jquery'
        },
        'angular':{
            exports:'angular'
        }
    },
    priority: [
        'jquery','angular'
    ],
    waitSeconds: 250
});

require([
    'jquery',
    'angular',
    'ptcode'
],function ($,angular) {
    var printDemo = angular.module('printDemo',['pt.code']);
    printDemo.controller('PrintCtrl',['$scope','$timeout',function ($scope, $timeout) {
        window.opener.VENUS.feedbackData();
        $scope.dailyFlowList=_printData.dailyFlowList;
        if($scope.dailyFlowList){//计算合计金额
            var sumPlanFee = 0.00;
            $.each($scope.dailyFlowList, function (index,data) {
                if(data.planFee)
                    sumPlanFee += Number(data.planFee);
            });
            $scope.sumPlanFee = sumPlanFee.toFixed(2);
        }
        $scope.dailyFlowCondition = _printData.dailyFlowCondition;
        $scope.printTest = function () {
            $("#printImg").css("display","none");
            window.print();
            $("#printImg").css("display","");
            return false;
        };
    }]);
    angular.element().ready(function () {
        angular.bootstrap($("#ng-app1"),['printDemo']);
    });
});