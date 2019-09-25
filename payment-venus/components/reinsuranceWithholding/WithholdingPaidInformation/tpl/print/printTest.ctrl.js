var _printData;
var transmittingData = function (data) {
    if(data){
        _printData = data;
    }
};

require.config({
    baseUrl:'',
    paths: {
        'jquery':'../../../../../lib/jquery/jquery.min',
        'angular':'../../../../../lib/angular/angular1.2.20',
        'codes':'../../../../../mock/data/codes.dev',
        'ptcode':'../../../../../widgets/mc.pt.code'
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
        $scope.printData=_printData.test;
        //日期格式转换
        Date.prototype.dateConversion = function () {

            return this.getFullYear() + '-' + ( (this.getMonth() + 1) < 10 ? 0 : '') + (this.getMonth() + 1) + '-' +
                (this.getDate() < 10 ? 0 : '') + this.getDate();
        };
        $scope.today=new Date().dateConversion();
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