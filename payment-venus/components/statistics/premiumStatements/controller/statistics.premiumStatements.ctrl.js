/**
 * 查询统计-保费报表统计
 */
define([
    'app',
    'config'
],function (app,config) {
    'use strict';
    app.registerController('PremiumStatementsCtrl', ['$scope','$$premiumStatements','$modal',
        function ($scope,$$premiumStatements,$modal) {

            $scope.tapFlag = '1';
            $scope.tapName=[
                {
                    'title':'实收保费清单',
                    'index':'1',
                    'active':true,
                    'btnStyle':{"width":"130px"}
                },
                {
                    'title':'预收保费明细表',
                    'index':'2',
                    'active':false,
                    'btnStyle':{"width":"130px"}
                },
                {
                    'title':'保费收入明细表',
                    'index':'3',
                    'active':false,
                    'btnStyle':{"width":"130px"}
                }
            ];

            //实收保费清单
            $scope.actualReceivedPremiums = [];
            $scope._actualReceivedPremiums = [
                {
                    salesman:"232000038/王蕾",
                    ticketClerk:"232000073/王婧嫣",
                    riskClass:"01/企业财产保险",
                    riskKind:"0101/财产基本保险",
                    policyNo:"20101232000017000065",
                    batchNo:"3010123200001700006501",
                    fleetAgreementNumber:"",
                    insure:"自然人",
                    insured:"自然人",
                    businessSourceBig:"中介业务",
                    businessSource:"专业代理",
                    teamType:"后线",
                    proxyManName:"江苏东方保险代理有限公司",
                    currency:"CNY",
                    amount:"0.00",
                    currencyCny:"0.00",
                    voucherDate:"",
                    voucherNo:"",
                    paymentWay:"其他",
                    paymentDate:"",
                    insurancePeriodStart:"2017-08-01",
                    insuranceAmount:"100000",
                    useNature:"",
                    brandModels:"",
                    vehicleAge:"",
                    seatNumber:"",
                    tonDigit:"",
                    riskType:"001(财产保险基本保险)",
                    newVehicleBuyPrice:"",
                    insureZipCode:"234242",
                    ownershipInstitution:"江苏分公司人事行政部",
                    basePremium:"1000.00",
                    vehicleKind:"",
                    serviceCharge:"-50.00",
                    serviceChargeInverse:"5%",
                    saleSupportCharge:"",
                    saleSupportChargeInverse:"",
                    performanceAmount:"",
                    performanceInverse:"",
                    actualServiceCharge:"",
                    payServiceCharge:"-50.00",
                    preferentialTreatmentCoefficient:"",
                    isNewVehicle:"",
                    isPOSFocusReceivables:"否"
                },
                {
                    salesman:"232000038/王蕾",
                    ticketClerk:"232000073/王婧嫣",
                    riskClass:"01/企业财产保险",
                    riskKind:"0101/财产基本保险",
                    policyNo:"20101232000017000065",
                    batchNo:"3010123200001700006502",
                    fleetAgreementNumber:"",
                    insure:"自然人",
                    insured:"自然人",
                    businessSourceBig:"中介业务",
                    businessSource:"专业代理",
                    teamType:"后线",
                    proxyManName:"江苏东方保险代理有限公司",
                    currency:"CNY",
                    amount:"0.00",
                    currencyCny:"0.00",
                    voucherDate:"",
                    voucherNo:"",
                    paymentWay:"其他",
                    paymentDate:"",
                    insurancePeriodStart:"2017-08-01",
                    insuranceAmount:"100000.00",
                    useNature:"",
                    brandModels:"",
                    vehicleAge:"",
                    seatNumber:"",
                    tonDigit:"",
                    riskType:"001(财产保险基本保险)",
                    newVehicleBuyPrice:"",
                    insureZipCode:"234242",
                    ownershipInstitution:"江苏分公司人事行政部",
                    basePremium:"1000.00",
                    vehicleKind:"",
                    serviceCharge:"-40.00",
                    serviceChargeInverse:"1%",
                    saleSupportCharge:"",
                    saleSupportChargeInverse:"",
                    performanceAmount:"",
                    performanceInverse:"",
                    actualServiceCharge:"",
                    payServiceCharge:"-40.00",
                    preferentialTreatmentCoefficient:"",
                    isNewVehicle:"",
                    isPOSFocusReceivables:"否"
                }
            ];

            //预收保费明细表
            $scope.predictReceivedPremiums = [];
            $scope._predictReceivedPremiums = [
                {
                    organization:"江苏分公司郊县营业部/2322400000",
                    salesman:"张小慧/232003017",
                    riskClass:"企业财产保险",
                    riskKind:"财产基本保险/0101",
                    policyNo:"20101232240013000004",
                    batchNo:"3010123224001300000401",
                    insured:"江苏省建设厅职业资格注册中心",
                    businessSourceBig:"专业代理",
                    businessSource:"专业代理",
                    proxyManName:"河南融元保险代理有限公司",
                    currency:"CNY",
                    amount:"-972.00",
                    currencyCny:"-972.00",
                    voucherDate:"2013-04-22",
                    voucherNo:"130400003",
                    paymentWay:"非见费业务",
                    isActualReceivedDate:"2013-04-22",
                    insurancePeriodStart:"2014-03-20",
                    underwritingDate:"2013-04-22",
                    isActualReceived:"否",
                    billDate:"2013-04-22",
                    saleSupportCharge:"0.00",
                    performanceAmount:"0.00"
                },
                {
                    organization:"江苏分公司郊县营业部/2322400000",
                    salesman:"张小慧/232003017",
                    riskClass:"企业财产保险",
                    riskKind:"财产基本保险/0101",
                    policyNo:"20101232240013000010",
                    batchNo:"3010123224001300001001",
                    insured:"江苏省建设厅职业资格注册中心",
                    businessSourceBig:"专业代理",
                    businessSource:"专业代理",
                    proxyManName:"河北盛安保险代理有限公司保定分公司",
                    currency:"CNY",
                    amount:"-299376.00",
                    currencyCny:"-299376.00",
                    voucherDate:"2013-05-23",
                    voucherNo:"130400056",
                    paymentWay:"非见费业务",
                    isActualReceivedDate:"2013-05-23",
                    insurancePeriodStart:"2014-03-20",
                    underwritingDate:"2013-05-23",
                    isActualReceived:"否",
                    billDate:"2013-05-23",
                    saleSupportCharge:"0.00",
                    performanceAmount:"0.00"
                }
            ];

            //保费收入明细表
            $scope.premiumIncomeDetails = [];
            $scope._premiumIncomeDetails = [
                {
                    policyNo:"20101232000017000026",
                    batchNo:"",
                    organizationCode:"2320000103",
                    organizationName:"江苏分公司财务企划部",
                    riskCode:"0101",
                    riskName:"财产基本保险",
                    businessBelongMan:"周鹏",
                    businessSourceBig:"直接业务",
                    customNatureInsure:"个人",
                    insure:"qq",
                    proxyMan:"",
                    underwritingDate:"2012-02-15",
                    riskClass:"企业财产保险/01",
                    vehicleType:"",
                    useNature:"",
                    currency:"EUR",
                    currencyIncludeTax:"106.72",
                    currencyCny:"949.98",
                    currencyUnIncludeTax:"0.00",
                    currencyAddValueTax:"0.00",
                    billDate:"2012-02-16",
                    receivedDate:"2012-02-16",
                    insurancePeriodStart:"2012-02-16",
                    insurancePeriodEnd:"2013-01-15",
                    separateInverse:"30.00",
                    unexpiredPremium:"106.72",
                    expiredPremium:"0.00",
                    serviceCharge:""
                },
                {
                    policyNo:"20101232000017000214",
                    batchNo:"3010123200001700006501",
                    organizationCode:"2320000201",
                    organizationName:"江苏分公司业务管理部",
                    riskCode:"0101",
                    riskName:"财产基本保险",
                    businessBelongMan:"季永健",
                    businessSourceBig:"专业代理",
                    customNatureInsure:"个人",
                    insure:"自然人",
                    proxyMan:"南京佳诚保险代理有限公司",
                    underwritingDate:"2012-11-29",
                    riskClass:"企业财产保险/01",
                    vehicleType:"",
                    useNature:"",
                    currency:"EUR",
                    currencyIncludeTax:"49.16",
                    currencyCny:"437.60",
                    currencyUnIncludeTax:"0.00",
                    currencyAddValueTax:"0.00",
                    billDate:"2012-11-30",
                    receivedDate:"2012-11-30",
                    insurancePeriodStart:"2012-11-30",
                    insurancePeriodEnd:"2013-11-29",
                    separateInverse:"29.99",
                    unexpiredPremium:"49.16",
                    expiredPremium:"0.00",
                    serviceCharge:"1.47"
                }
            ];

            $scope.changeTap = function (index) {
                $scope.tapFlag = index;
                $scope.resetSupplementCondition();
                $scope.actualReceivedPremiums = [];
                $scope.predictReceivedPremiums = [];
                $scope.premiumIncomeDetails = [];
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
                    statisticsDateStart:"",
                    statisticsDateEnd:"",
                    includeChildSection:true,
                    riskCode:"",
                    currencyCode:"",
                    actualReceivedConfirmDateStart:"",
                    actualReceivedConfirmDateEnd:""
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
                   $scope.actualReceivedPremiums = $scope._actualReceivedPremiums;
               }else if($scope.tapFlag=="2"){
                   //预收保费明细表
                   $scope.predictReceivedPremiums = $scope._predictReceivedPremiums;
               }else if($scope.tapFlag=="3"){
                   //保费收入明细表
                   $scope.premiumIncomeDetails = $scope._premiumIncomeDetails;
               }
            };

            //生成月账单数据
            $scope.createMonthAccounts = function(){

            };

            init();

        }

    ])
});
