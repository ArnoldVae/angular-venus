/**
 * 查询统计-费用报表统计
 */
define([
    'app',
    'config'
],function (app,config) {
    'use strict';
    app.registerController('CostStatementsCtrl', ['$scope','$$costStatements','$modal',
        function ($scope,$$costStatements,$modal) {

            $scope.tapFlag = '1';
            $scope.tapName=[
                {
                    'title':'手续费清单',
                    'index':'1',
                    'active':true,
                    'btnStyle':{"width":"130px"}
                }
            ];

            //手续费清单
            $scope.serviceCharges = [];
            $scope._serviceCharges = [
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
                $scope.serviceCharges = [];
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

            /**
             * 初始化/重置
             * */
            $scope.resetSupplementCondition = function(){
                $scope.supplementCondition = {
                    organization:"13000000",
                    salesman:"",
                    proxyOrganization:"",
                    settlementNo:"",
                    includeChildSection:true,
                    riskCode:"",
                    insureName:"",
                    insuredName:"",
                    statisticsDateStart:"",
                    statisticsDateEnd:""
                }
            };

            //是否包含下级机构
            $scope.chooseIncludeChildSection = function(type){
                if(type=='1'){
                    $scope.supplementCondition.includeChildSection = true;
                }else{
                    $scope.supplementCondition.includeChildSection = false;
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
            /**
             * 凭证查询--清单查询
             */
            $scope.searchSupplementCondition = function () {
               if($scope.tapFlag=="1") {
                   //实收保费清单
                   $scope.serviceCharges = $scope._serviceCharges;
               }
            };

            //生成月账单数据
            $scope.createMonthAccounts = function(){

            };

            init();

        }

    ])
});
