/**
 * 查询统计-税务报表统计
 */
define([
    'app',
    'config'
],function (app,config) {
    'use strict';
    app.registerController('TaxStatementsCtrl', ['$scope','$$taxStatements','$modal',
        function ($scope,$$taxStatements,$modal) {

            $scope.tapFlag = '1';
            $scope.tapName=[
                {
                    'title':'已收未缴清单',
                    'index':'1',
                    'active':true,
                    'btnStyle':{"width":"130px"}
                },
                {
                    'title':'未收未缴清单',
                    'index':'2',
                    'active':false,
                    'btnStyle':{"width":"130px"}
                },
                {
                    'title':'已收已缴清单',
                    'index':'3',
                    'active':false,
                    'btnStyle':{"width":"130px"}
                },
                {
                    'title':'车船税平台对账',
                    'index':'4',
                    'active':false,
                    'btnStyle':{"width":"130px"}
                }
            ];

            //已收未缴清单
            $scope.receivedUnpaids = [];
            $scope._receivedUnpaids = [
                {
                    policyNo:"20590232210009000008",
                    policyConfirmDate:"2009-12-28",
                    mainInsured:"32209000040",
                    mainInsuredName:"江苏省广播电视信息网络股份1有限公司南京分公司",
                    mainInsuredAddress:"江苏省南京市白下区白下路358号",
                    taxpayer:"",
                    taxpayerName:"",
                    taxpayerNo:"67902981-0",
                    taxpayerCardNo:"",
                    taxpayerDesc:"正常缴税",
                    customNature:"法人",
                    vehicleNo:"苏A33175",
                    engineNumber:"301556",
                    vin:"LSVTN13308N689138",
                    exhaustCapacity:"1781.00",
                    vehicleColor:"蓝",
                    dutyPaidProof:"",
                    tax:"100103",
                    taxName:"载客汽车",
                    useNature:"非营业企业",
                    vehicleModelType:"桑塔纳SVW7182HQi轿车",
                    vehicleType:"乘用车",
                    tonDigit:"0",
                    seatNumber:"5",
                    brandModels:"桑塔纳SVW7182HQi轿车",
                    curbWeight:"1.22",
                    taxPayable:"360.00",
                    underwritingPassDate:"2009-12-23",
                    insurancePeriodStart:"2009-12-24",
                    initialArrivalDate:"2008-12-01",
                    timeOfTax:"",
                    paymentDate:"2009-12-23",
                    settlementFlag:"正常缴税",
                    payableInTheCurrentYear:"360.00",
                    payBackInPreviousYears:"0.00",
                    lateFee:"0.00",
                    total:"360.00",
                    salesman:"232003008",
                    ticketClerk:"王婧嫣",
                    proxyMan:"U200002000009"
                },
                {
                    policyNo:"20590232210009000002",
                    policyConfirmDate:"2009-12-01",
                    mainInsured:"32209000004",
                    mainInsuredName:"钱成龙",
                    mainInsuredAddress:"南京市建邺区积善新寓丰勤园14幢401",
                    taxpayer:"",
                    taxpayerName:"",
                    taxpayerNo:"320114760226211",
                    taxpayerCardNo:"",
                    taxpayerDesc:"正常缴税",
                    customNature:"自然人",
                    vehicleNo:"苏AMX975",
                    engineNumber:"61084546",
                    vin:"LJDAAA21160208652",
                    exhaustCapacity:"1341.00",
                    vehicleColor:"蓝",
                    dutyPaidProof:"",
                    tax:"100102",
                    taxName:"载客汽车",
                    useNature:"家庭自用",
                    vehicleModelType:"起亚YQZ7130轿车",
                    vehicleType:"乘用车",
                    tonDigit:"0",
                    seatNumber:"5",
                    brandModels:"起亚YQZ7130轿车",
                    curbWeight:"1.01",
                    taxPayable:"300.00",
                    underwritingPassDate:"2009-12-01",
                    insurancePeriodStart:"2009-12-19",
                    initialArrivalDate:"2006-12-22",
                    timeOfTax:"",
                    paymentDate:"2009-12-01",
                    settlementFlag:"正常缴税",
                    payableInTheCurrentYear:"360.00",
                    payBackInPreviousYears:"0.00",
                    lateFee:"0.00",
                    total:"360.00",
                    salesman:"232003003",
                    ticketClerk:"王婧嫣",
                    proxyMan:"U200002000005"
                }
            ];

            //未收未缴清单
            $scope.unreceivedUnpaids = [];
            $scope._unreceivedUnpaids = [
                {
                    policyNo:"20590232210009000008",
                    policyConfirmDate:"2009-12-28",
                    mainInsured:"32209000040",
                    mainInsuredName:"江苏省广播电视信息网络股份1有限公司南京分公司",
                    mainInsuredAddress:"江苏省南京市白下区白下路358号",
                    taxpayer:"",
                    taxpayerName:"",
                    taxpayerNo:"67902981-0",
                    taxpayerCardNo:"",
                    taxpayerDesc:"正常缴税",
                    customNature:"法人",
                    vehicleNo:"苏A33175",
                    engineNumber:"301556",
                    vin:"LSVTN13308N689138",
                    exhaustCapacity:"1781.00",
                    vehicleColor:"蓝",
                    dutyPaidProof:"",
                    tax:"100103.00",
                    taxName:"载客汽车",
                    useNature:"非营业企业",
                    vehicleModelType:"桑塔纳SVW7182HQi轿车",
                    vehicleType:"乘用车",
                    tonDigit:"",
                    seatNumber:"5",
                    brandModels:"桑塔纳SVW7182HQi轿车",
                    curbWeight:"1.22",
                    taxPayable:"360.00",
                    underwritingPassDate:"2009-12-23",
                    insurancePeriodStart:"2009-12-24",
                    initialArrivalDate:"2008-12-01",
                    timeOfTax:"",
                    paymentDate:"2009-12-23",
                    settlementFlag:"正常缴税",
                    payableInTheCurrentYear:"360.00",
                    payBackInPreviousYears:"0.00",
                    lateFee:"0.00",
                    total:"360.00",
                    salesman:"232003008",
                    ticketClerk:"王婧嫣",
                    proxyMan:"U200002000009"
                },
                {
                    policyNo:"20590232210009000002",
                    policyConfirmDate:"2009-12-01",
                    mainInsured:"32209000004",
                    mainInsuredName:"钱成龙",
                    mainInsuredAddress:"南京市建邺区积善新寓丰勤园14幢401",
                    taxpayer:"",
                    taxpayerName:"",
                    taxpayerNo:"320114760226211",
                    taxpayerCardNo:"",
                    taxpayerDesc:"正常缴税",
                    customNature:"自然人",
                    vehicleNo:"苏AMX975",
                    engineNumber:"61084546",
                    vin:"LJDAAA21160208652",
                    exhaustCapacity:"1341.00",
                    vehicleColor:"蓝",
                    dutyPaidProof:"",
                    tax:"100102.00",
                    taxName:"载客汽车",
                    useNature:"家庭自用",
                    vehicleModelType:"起亚YQZ7130轿车",
                    vehicleType:"乘用车",
                    tonDigit:"",
                    seatNumber:"5",
                    brandModels:"起亚YQZ7130轿车",
                    curbWeight:"1.01",
                    taxPayable:"300.00",
                    underwritingPassDate:"2009-12-01",
                    insurancePeriodStart:"2009-12-19",
                    initialArrivalDate:"2006-12-22",
                    timeOfTax:"",
                    paymentDate:"2009-12-01",
                    settlementFlag:"正常缴税",
                    payableInTheCurrentYear:"360.00",
                    payBackInPreviousYears:"0.00",
                    lateFee:"0.00",
                    total:"360.00",
                    salesman:"232003003",
                    ticketClerk:"王婧嫣",
                    proxyMan:"U200002000005"
                }
            ];

            //已收已缴清单
            $scope.receivedPaids = [];
            $scope._receivedPaids = [
                {
                    policyNo:"20590232000013000275",
                    taxpayer:"32113001680",
                    taxpayerName:"甄子恬",
                    taxpayerAddress:"萨法阿萨安师大",
                    taxpayerNo:"34222419806260812",
                    taxpayerCardNo:"",
                    vehicleNo:"苏12ZZZ",
                    exhaustCapacity:"1342.00",
                    dutyPaidProof:"",
                    tax:"100102.00",
                    taxName:"乘用车",
                    seatNumber:"5",
                    curbWeight:"",
                    taxPayable:"300.00",
                    timeOfTax:"",
                    paymentDate:"2013-12-11",
                    settlementFlag:"",
                    payableInTheCurrentYear:"300.00",
                    payBackInPreviousYears:"1020.00",
                    lateFee:"383.25",
                    total:"1703.25",
                    salesman:"200000109",
                    proxyMan:"",
                    vin:"LS3724s321321232z",
                    engineNumber:"3554354354353z",
                    brandModels:"吉利JL7130XIU",
                    registerDate:"2013-10-01"

                },
                {
                    policyNo:"20590232000013000002",
                    taxpayer:"32210000004",
                    taxpayerName:"南京旭日旅游有限公司",
                    taxpayerAddress:"南京市玄武区北京东路40号",
                    taxpayerNo:"320102733174104",
                    taxpayerCardNo:"",
                    vehicleNo:"苏A66585",
                    exhaustCapacity:"",
                    dutyPaidProof:"",
                    tax:"1002.02",
                    taxName:"商用车",
                    seatNumber:"47",
                    curbWeight:"11.20",
                    taxPayable:"540.00",
                    timeOfTax:"",
                    paymentDate:"2012-10-25",
                    settlementFlag:"",
                    payableInTheCurrentYear:"600.00",
                    payBackInPreviousYears:"0.00",
                    lateFee:"0.00",
                    total:"600.00",
                    salesman:"232003016",
                    proxyMan:"U2000002000009",
                    vin:"LKLR1FSF17B007309",
                    engineNumber:"A4402700073",
                    brandModels:"金龙KLQ6109旅游客车",
                    registerDate:"2007-12-01"

                }
            ];

            //车船税对账清单
            $scope.vehicleVesselTaxAccounts = [];
            $scope._vehicleVesselTaxAccounts = [];

            $scope.changeTap = function (index) {
                $scope.tapFlag = index;
                $scope.resetSupplementCondition();
                $scope.receivedUnpaids = [];
                $scope.unreceivedUnpaids = [];
                $scope.receivedPaids = [];
                $scope.vehicleVesselTaxAccounts = [];
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
                    section:"",
                    taxpayerNo:"",
                    vehicleNo:"",
                    statisticsDateStart:"",
                    statisticsDateEnd:"",
                    includeChildSection:true,
                    accountType:"0",
                    accountDate:""
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
                //实例化对象
                $scope.resetSupplementCondition();
            };
            /**
             * 凭证查询--清单查询
             */
            $scope.searchSupplementCondition = function () {
               if($scope.tapFlag=="1") {
                   //已收未缴清单
                   $scope.receivedUnpaids = $scope._receivedUnpaids;
               }else if($scope.tapFlag=="2"){
                   //未收未缴清单
                   $scope.unreceivedUnpaids = $scope._unreceivedUnpaids;
               }else if($scope.tapFlag=="3"){
                   //已收已缴清单
                   $scope.receivedPaids = $scope._receivedPaids;
               }else if($scope.tapFlag=="4"){
                   //车船税对账清单
                   $scope.vehicleVesselTaxAccounts = $scope._vehicleVesselTaxAccounts;
               }
            };

            //生成月账单数据
            $scope.createMonthAccounts = function(){

            };

            init();

        }

    ])
});
