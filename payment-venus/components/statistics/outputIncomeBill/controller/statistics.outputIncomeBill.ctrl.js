/**
 * 查询统计-往来账清单管理
 */
define([
    'app',
    'config'
],function (app,config) {
    'use strict';
    app.registerController('OutputIncomeBillCtrl', ['$scope','$$outputIncomeBill','$modal',
        function ($scope,$$outputIncomeBill,$modal) {

            //手续费清单
            $scope.outputIncomeBills = [];
            $scope._outputIncomeBills = [
                {
                    organizationName:"232000038/王蕾",
                    policyNo:"20101232000017000065",
                    riskKind:"0101/财产基本保险",
                    insured:"自然人",
                    businessChannel:"",
                    actualPremium:"500.00",
                    serviceChargeInverse:"5%",
                    serviceCharge:"-25.00",
                    currency:"CNY",
                    currencyCny:"25.00",
                    salesman:"",
                    proxyOrganization:"",
                    insuranceProxyBusinessCardNo:"",
                    serviceChargePayAccount:"",
                    insurancePeriodStart:"2017-08-01",
                    insurancePeriodEnd:"2018-08-01",
                    signDate:"",
                    underwritingDate:"",
                    isPay:"否",
                    serviceChargePayNo:"",
                    payDate:""
                }
            ];

            $scope.changeTap = function (index) {
                $scope.tapFlag = index;
                $scope.resetSupplementCondition();
                $scope.outputIncomeBills = [];
            };

            $scope.changeWay=function(index){
                $.each($scope.menuName, function (id, target) {
                    if (target.index == index) {
                        target.active = true;
                    } else {
                        target.active = false;
                    }
                });
                $scope.tapFlag=index
            };

            $scope.supplementCondition = {
                company:"",
                businessType:"0",
                statisticsDateStart:"",
                statisticsDateEnd:""
            };

            /**
             * 初始化/重置
             * */
            $scope.resetSupplementCondition = function(){
                $scope.supplementCondition1 = {
                    company:"",
                    businessType:"0",
                    statisticsDateStart:"",
                    statisticsDateEnd:""
                }
            };

            var init=function(){
                $scope.pagination = {
                    totalItems:'',//总数
                    pageIndex:'1',//当前页面
                    pageSize:'20',//显示条数
                    maxSize:'3',//最大页数
                    numPages:'',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                };
                $scope.resetSupplementCondition();
            };

            init();

        }

    ])
});
