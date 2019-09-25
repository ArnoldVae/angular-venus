/**
 * 收付员日结控制器
 */
define([
    '../module',
    'config'
], function (moduleApp, config) {
    'use strict';
    var tellerDailyCtrl = function ($scope, $$tellerDaily,$modal,$$code,mcMultiEditorCacheService,$timeout) {
        //收付员日结控制器...

        //字符戳转日期方法
        var changeDate = function (d) {
            var date = new Date(d);
            return (date.getFullYear())+"-"+(date.getMonth()+1)+"-"+date.getDate();
        };

        /**
         * 查看流水单公共方法
         */
        var lookFlowCommon = function (keyword) {
            $modal.open({
                templateUrl:'components/tellerDaily/tpl/modal/lookInfo.modal.html',
                resolve:{
                    target:function () {
                        return keyword
                    }},
                controller:function ($scope,$modalInstance,target) {
                    //查询流水单信息
                    $$tellerDaily.lookFlow({"dailyAccount":target.dailyAccount,"pageNo":1, "pageSize":2000},{
                        success: function (data) {
                            $scope.dailyFlowList = data.content;
                            if($scope.dailyFlowList){
                                var sumPlanFee = 0.00;
                                $.each($scope.dailyFlowList, function (index,data) {
                                    if(data.planFee)
                                        sumPlanFee += Number(data.planFee);
                                });
                                $scope.sumPlanFee = sumPlanFee.toFixed(2);
                            }
                        },
                        error: function (e) {
                        }
                    });
                    $scope.dailyFlowCondition = {};
                    $scope.dailyFlowCondition = target;
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };

                    //日收入业务流水清单打印
                    var printer=undefined;
                    var _printData = undefined;
                    window.VENUS.feedbackData = function(){
                        if(printer)
                            printer.transmittingData(_printData);
                    };
                    $scope.printTest=function(){
                        if($scope.dailyFlowList && $scope.dailyFlowList.length > 0){
                            $.each($scope.dailyFlowList, function (index, _obj) {
                                _obj.businessType = $$code.getCodeName(_obj.businessType, 'tellerDailyLookInfoBusinessType');
                                _obj.payType = $$code.getCodeName(_obj.payType, 'paywaycode');
                            });
                        }
                        _printData ={
                            dailyFlowList:$scope.dailyFlowList,
                            dailyFlowCondition:$scope.dailyFlowCondition
                        };
                        $scope.url = 'components/tellerDaily/tpl/modal/lookInfo.print.html';
                        printer = window.open($scope.url);
                    };

                    //流水单导出
                    $scope.exportdailyFlow = function () {
                        $$tellerDaily.exportDailyPaymentDetail({dailyAccount:target.dailyAccount},{
                            success: function (data) {
                                if(data.resultCode=="0000"){
                                    $scope.fileId = JSON.parse(data.resultMsg).fileId;
                                    window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
                                }else if(data.resultCode=="9999"){
                                    layerMsg(data.resultMsg);
                                }
                            },
                            error: function (e) {

                            }
                        });
                    };
                }
            });
        };

        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('tellerDaily');//获取上次数据
            if(localDada){
                $scope.tellerDaily=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('tellerDaily',$scope.tellerDaily);//存储数据
        };

        /**
         * 查询
         */
        $scope.findDaily = function () {
            if($scope.tellerDaily.findDailyCondition.currency==""){
                layerMsg("请录入币种！");
                return false;
            }
            $scope.tellerDaily.findDailyCondition.balanceDate = $scope.tellerDaily.currentDate;//重新获取要查询的日结日期
            //查询补充资料
            $$tellerDaily.findDailyAddtional($scope.tellerDaily.findDailyCondition,{
                success: function (data) {
                    /**
                     * 汇总表--->dailyPaymentSumDtos
                     */
                    $scope.tellerDaily.findDaily.dailyPaymentSumDtos = data[0].dailyPaymentSumDtos;
                    //汇总合计金额
                    var debitSumAll = 0.00;
                    var creditSumAll = 0.00;
                    angular.forEach(data[0].dailyPaymentSumDtos,function (_data) {
                        if(_data.debitSum)
                            debitSumAll += Number(_data.debitSum);
                        if(_data.creditSum)
                            creditSumAll += Number(_data.creditSum);
                    });

                    $scope.tellerDaily.findDaily.debitSumAll = debitSumAll.toFixed(2);
                    $scope.tellerDaily.findDaily.creditSumAll = creditSumAll.toFixed(2);

                    /**
                     * 补充资料数组--->additionalInformDtos
                     */
                    $scope.tellerDaily.findDaily.supInfoList = data[0].additionalInformDtos;
                    //补充资料红冲合计金额
                    var debitSupSumAll = 0.00;
                    var creditSupSumAll = 0.00;
                    angular.forEach(data[0].additionalInformDtos,function (_data) {
                        if(_data.debitSum)
                            debitSupSumAll += Number(_data.debitSum);
                        if(_data.creditSum)
                            creditSupSumAll += Number(_data.creditSum);
                    });
                    $scope.tellerDaily.findDaily.debitSupSumAll = debitSupSumAll.toFixed(2);
                    $scope.tellerDaily.findDaily.creditSupSumAll = creditSupSumAll.toFixed(2);


                    //从汇总数组中取出日结单号，用于查看当前日结单的流水单和取消日结，还有导出操作
                    if(data && data[0] && data[0].dailyPaymentSumDtos && data[0].dailyPaymentSumDtos.length > 0 && data[0].dailyPaymentSumDtos[0]){
                        $scope.tellerDaily.findDaily.dailyAccount = data[0].dailyPaymentSumDtos[0].dailyAccount;
                    }else {
                        $scope.tellerDaily.findDaily.dailyAccount = '';
                    }

                    saveData();//储存数据

                },
                error: function (e) {

                }
            });
        };

        /**
         * 收付员日结导出
         */
        $scope.exportDaily = function () {
            //点击查询按钮后会返回汇总+补充；然后从汇总数组中取出日结单号，如果有具体的日结单号才能根据具体单号导出
            if($scope.tellerDaily.findDaily.dailyAccount){
                var keyword = {
                    "dailyAccount":$scope.tellerDaily.findDaily.dailyAccount,
                    "balanceDate":$scope.tellerDaily.findDailyCondition.balanceDate,
                    "handlerCode":$scope.tellerDaily.findDailyCondition.handlerCode,
                    "currency":$scope.tellerDaily.findDailyCondition.currency
                };
                $$tellerDaily.exportDailyAddtional(keyword,{
                    success: function (data) {
                        if(data.resultCode=="0000"){
                            $scope.fileId = JSON.parse(data.resultMsg).fileId;
                            window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
                        }else if(data.resultCode=="9999"){
                            layerMsg(data.resultMsg);
                        }
                    },
                    error: function (e) {

                    }
                });
            }else {
                layerMsg('请先点击查询按钮，得到要导出的日结单号')
            }

        };

        /**
         * 底部查看流水单按钮
         */
        $scope.lookFlow = function () {
            //点击查询按钮后会返回汇总+补充；然后从汇总数组中取出日结单号，如果有具体的日结单号才能根据具体单号查询流水单
            if($scope.tellerDaily.findDaily.dailyAccount){
                var keyword = angular.copy($scope.tellerDaily.findDailyCondition);//copy防止日结单号传进去
                keyword.dailyAccount = $scope.tellerDaily.findDaily.dailyAccount;//从汇总数组中取出日结单号，(用于查看当前日结单的流水单和取消日结，还有导出操作)
                lookFlowCommon(keyword);
            }else{
                layerMsg('请先点击查询按钮，得到要查看流水单的日结单号');
            }

        };
        /**
         * 立即日结
         */
        $scope.endDay = function () {
            $$tellerDaily.endDay($scope.tellerDaily.endDayCondition,{
                success: function (data) {
                    //TODO 取参方式需从后台获取数据结构，目前：后端没有返回json对象，直接返回文字
                    if(data.resultCode=="0000"){
                        layer.msg(data.resultMsg,{icon:1});
                        // initDaily();
                    }
                    else{
                        layerMsg(data.resultMsg);
                        // initDaily();
                    }
                },
                error: function (e) {

                }
            })
        };
        /**
         * 取消日结
         */
        $scope.cancelDaily = function () {
            //点击查询按钮后会返回汇总+补充；然后从汇总数组中取出日结单号，如果有具体的日结单号才能根据具体单号取消日结
            if($scope.tellerDaily.findDaily.dailyAccount){
                $$tellerDaily.cancelDaily($scope.tellerDaily.findDaily.dailyAccount,{
                    success: function (data) {
                        if(data.resultCode=="0000"){
                            layer.msg(data.resultMsg,{icon:1});
                        }else{
                            layerMsg(data.resultMsg);
                        }
                    },
                    error: function (e) {
                    }
                })
            }else{
                layerMsg('请先点击查询按钮，得到要取消日结的日结单号');
            }
        };
        /**
         * 日点击回调
         */
        $scope.onDayClick = function (target) {
            //TODO 日历部分仍需调整
            var currentDate =target.currentDate.split(":").join("-");
            if(currentDate.indexOf("今") >= 0) {//如果是今通过
                var date = new Date();
                currentDate = date.dateConversion();
                if(currentDate.split("-")[2].indexOf("0") >= 0){
                    currentDate=currentDate.split("-")[0]+'-'+currentDate.split("-")[1]+'-'+currentDate.split("-")[2].substring(1,2);
                }
            }

            angular.forEach($scope.data,function (data) {
                if (data.date==currentDate){
                    $scope.tellerDaily.currentDate = data.date;
                    $scope.tellerDaily.status =data.status;
                    $scope.searchDailyInfo({currentDate:$scope.tellerDaily.currentDate});
                }
            });
        };
        /**
         * 月点击回调
         */
        $scope.onMonthClick = function (date) {
            //TODO 日历部分仍需调整，显示状态需确定
            var monthDay = {};
            monthDay.year = date.split(":")[0];
            monthDay.month =date.split(":")[1];
            monthDay.handlerCode = $scope.usercode;
            $$tellerDaily.initDaily(monthDay,{
                success: function (data) {
                    var setDay = [{}];
                    setDay = data;
                    angular.forEach(setDay,function (_data) {
                        _data.date = changeDate(_data.date)
                        if(_data.status == '5' ){//未日结
                            _data.color = "";
                            _data.type = "";
                        }else if(_data.status == '2'){//完成
                            _data.type = ["ok"];
                            _data.color = "#fff";
                        }
                        else if(_data.status == '4'){//失败
                            _data.type = ["fail"];
                            _data.color = "#fff";
                        }
                    });
                    $scope.data = setDay;
                },
                error: function (e) {
                }
            });
        };

        /**
         * 日结失败清单查询
         */
        $scope.searchDailyInfo = function () {
            $$tellerDaily.searchDailyInfo($scope.tellerDaily.dateErrorCondition,{
                success: function (data) {
                    $scope.tellerDaily.dateErrorList = data.content;
                },
                error: function (e) {
                }
            });
        };

        //业务员日结失败清单查看错误日志表信息
        $scope.queryDailyErrorMsg = function (dailyAccount) {
            $modal.open({
                templateUrl:'components/tellerDaily/tpl/modal/dailyErrorMsg.modal.html',
                resolve:{
                    dailyAccount:function () {
                        return dailyAccount;
                    }},
                controller:function ($scope,$modalInstance,dailyAccount) {
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };

                    //查看错误日志表信息
                    $$tellerDaily.queryDailyErrorMsg(dailyAccount,{
                        success: function (data) {
                            $scope.dailyErrorMsg = data;
                        },
                        error: function (e) {
                        }
                    });
                }
            });
        };

        /**
         * 日历初始化
         */
        var initDaily = function(){
            var date = new Date();
            var monthDay = {};
            monthDay.year = date.dateConversion().split("-")[0];
            var month = date.dateConversion().split("-")[1];
            monthDay.month = month;
            monthDay.handlerCode = $scope.usercode;
            $$tellerDaily.initDaily(monthDay,{
                success: function (data) {
                    var setDay = [{}];
                    setDay = data;
                    angular.forEach(setDay,function (_data) {
                        _data.date = changeDate(_data.date);//调用方法字符戳转化为日期
                        if(_data.status == '5' ){//未日结
                            _data.color = "";
                            _data.type = "";
                        }else if(_data.status == '2'){//完成
                            _data.type = ["ok"];
                            _data.color = "#fff";
                        }
                        else if(_data.status == '4'){//失败
                            _data.type = ["fail"];
                            _data.color = "#fff";
                        }
                    });
                    $scope.data = setDay;
                    $scope.searchDailyInfo();
                    saveData();//储存数据
                },
                error: function (e) {
                }
            });
        };

        /**
         * 初始化
         */
        var init = function () {
            //获取实例化数组
            $scope.tellerDaily = $$tellerDaily.TellerDaily();//实例化对象
            initDaily();
            getLastData();
            $scope.tellerDaily.endDayCondition.handlerCode = $scope.usercode;
            $scope.tellerDaily.endDayCondition.comCode = $scope.comCode;
            $scope.tellerDaily.findDailyCondition.handlerCode = $scope.usercode;
            $scope.tellerDaily.dateErrorCondition.handlerCode = $scope.usercode;
            $scope.tellerDaily.dateErrorCondition.comCode = $scope.comCode;

        };
        init();
    };
    moduleApp.controller('tellerDailyCtrl', ['$scope', '$$tellerDaily','$modal','$$code','mcMultiEditorCacheService','$timeout', tellerDailyCtrl]);
});