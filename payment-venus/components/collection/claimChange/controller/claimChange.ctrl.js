/**
 *认领变更控制器
 */
define([
    '../module'
], function (moduleApp) {
    'use strict';
    var claimChange = function ($scope, $$claimChange,$modal,mcMultiEditorCacheService) {
        /**
         * 查询
         */
        $scope.searchClaimChange = function (target) {
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            if($scope.centerCode=="02"){
                if($scope.claimChangeCondition.tradingNo == ""&& $scope.claimChangeCondition.inputDateFrom=="" && $scope.claimChangeCondition.inputDateTo==""&&$scope.claimChangeCondition.certiNo==""){
                    layerMsg("平台交易号、业务单号、登记日期不能同时为空！");
                    return false
                }
            }else{
                if($scope.claimChangeCondition.transactionNo == ""&& $scope.claimChangeCondition.inputDateFrom=="" && $scope.claimChangeCondition.inputDateTo==""&&$scope.claimChangeCondition.certiNo==""){
                    layerMsg("缴费通知单号、业务单号、登记日期不能同时为空！");
                    return false
                }
            }
            if($scope.claimChangeCondition.claimStatus == undefined){
                layerMsg("认领状态不能为空！");
                return false
            }
            if($scope.claimChangeCondition.inputDateFrom!=""&&$scope.claimChangeCondition.inputDateTo!=""&&$scope.claimChangeCondition.inputDateFrom>$scope.claimChangeCondition.inputDateTo){
                layerMsg("起始登记日期不能大于终止登记日期！");
                return false
            }
            if($scope.claimChangeCondition.sumFeeCnyFrom!=""&&$scope.claimChangeCondition.sumFeeCnyTo!=""&&Number($scope.claimChangeCondition.sumFeeCnyFrom)>Number($scope.claimChangeCondition.sumFeeCnyTo)){
                layerMsg("起始金额不能大于终止金额！");
                return false
            }
            $$claimChange.searchClaimChange($scope.claimChangeCondition,{
                success: function (data) {
                    console.log(data);
                    $scope.claimChangeList = data.content.content;
                    if(!target&&$scope.claimChangeList.length == 0){
                        layerMsg("暂无数据！")
                    }
                    $scope.pagination.totalItems = data.content.totalCount;
                    saveData();
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex-1,
                "pageSize": $scope.pagination.pageSize
            });
        };
        /**
         *重置
         */
        $scope.resetClaimChange = function () {
            $scope.claimChangeCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":"payment.collection.claimmanagement.claimchange",
                "transactionNo":"",
                "tradingNo":"",
                "inputDateFrom":"",
                "inputDateTo":"",
                "claimStatus":"2",
                "certiNo":""
            };
            saveData();
        };
        /**
         * 认领替换
         */
        $scope.claimChangeInfo = function (target) {
            target.webUserCode = $scope.usercode;
            target.webComCode = $scope.comCode;
            $modal.open({
                templateUrl: 'components/collection/claimChange/tpl/modal/claimChangeInfo.modal.html',
                resolve: {
                    target:function () {
                        return target
                    },
                    usercode: function () {
                        return $scope.usercode
                    },
                    comCode: function () {
                        return $scope.comCode
                    }
                },
                controller: function ($scope, $modalInstance,target,usercode,comCode) {
                    //初始化
                    var localFee = 0;//存储查询出的交易金额
                    var localLength = 0;//存储银行流水条数
                    var localStatus = 0;//存储上一次是否转无单预收状态
                    var init = function(){
                        $scope.changeClaimCondition = {
                            "prpJClaimTransactionMainDtoList":[],
                            "prpJClaimBankFlowDetallDtoList":[]
                        };
                        //查询详情
                        $$claimChange.lookClaimChange(target,{
                            success: function (data) {
                                console.log(data);
                                $scope.changeClaimCondition = data.content;
                                localLength = $scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList.length;
                                $scope.changeClaimCondition.webUserCode =usercode;
                                $scope.changeClaimCondition.webComCode = comCode;
                                angular.forEach($scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList, function (data) {
                                    localFee += Number(data.amount);
                                });
                                $scope.selectAdd();
                            },
                            error: function (e) {
                            }
                        });
                    };
                    init();
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //认领替换
                    $scope.changeClaim = function () {
                        var localAmount = 0;//存储替换后的交易金额
                        if($scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList.length !=localLength){
                            layerMsg("银行流水只能一对一替换！");
                            return false
                        }
                        angular.forEach($scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList, function (data) {
                            localAmount += Number(data.amount);
                        });
                        if(localFee != localAmount){
                            layerMsg("替换后的银行流水金额需与原银行流水金额一致！");
                            return false
                        }
                        $$claimChange.changeClaim($scope.changeClaimCondition,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode == "0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close();
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        });
                    };
                    //删除
                    $scope.deleteMessage = function (index) {
                        if($scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList.length<localLength){
                            layerMsg("请先添加银行流水！")
                        }else{
                            localStatus =$scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList[index].isNoBill;
                            $scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList.splice(index,1)
                        }
                    };
                    //查询银行流水
                    $scope.queryBankFlow = function () {
                        $modal.open({
                            templateUrl: 'components/collection/claimChange/tpl/modal/queryBankFlow.modal.html',
                            resolve: {
                                reviseBankList :function () {
                                    return $scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList;
                                },
                                usercode: function () {
                                    return usercode
                                },
                                comCode: function () {
                                    return comCode
                                }
                            },
                            controller: function ($scope, $modalInstance,reviseBankList,usercode,comCode,$rootScope){
                                $scope.centerCode = $rootScope.user.centerCode;
                                $scope.modalBankFlow = {
                                    "webUserCode":usercode,
                                    "webComCode":comCode,
                                    "comCode":""
                                };
                                $scope.status = {
                                    "checkedAll":false
                                };
                                $scope.pagination = {
                                    totalItems: '',//总数
                                    pageIndex: '1',//当前页面
                                    pageSize: '15',//显示条数
                                    maxSize: '5',//最大页数
                                    numPages: '',//共有多少页
                                    previousText: '上一页',
                                    nextText: '下一页',
                                    firstText: '首页',
                                    lastText: '末页'
                                };
                                //查询
                                $scope.searchBankFlow = function (target) {
                                    if(target!='page'){
                                        $scope.pagination.pageIndex=1;
                                    }
                                    if($scope.modalBankFlow.comCode==""){
                                        layerMsg("账号归属机构不能为空！");
                                        return false
                                    }
                                    if($scope.modalBankFlow.transDateFrom!=""&&$scope.modalBankFlow.transDateTo!=""&&$scope.modalBankFlow.transDateFrom>$scope.modalBankFlow.transDateTo){
                                        layerMsg("起始交易日期不能大于终止交易日期！");
                                        return false
                                    }
                                    if($scope.modalBankFlow.amountFrom!=""&&$scope.modalBankFlow.amountTo!=""&&Number($scope.modalBankFlow.amountFrom)>Number($scope.modalBankFlow.amountTo)){
                                        layerMsg("起始交易金额不能大于终止交易金额！");
                                        return false
                                    }
                                    $$claimChange.searchBankFlow($scope.modalBankFlow,{
                                        success:function (data) {
                                            $scope.modalBankFlowList = data.content.content;
                                            if($scope.modalBankFlowList.length == 0){
                                                layerMsg("暂无数据！")
                                            }
                                            $scope.pagination.totalItems = data.content.totalCount;
                                        },
                                        error:function (d) {
                                        }
                                    },{
                                        "pageNo": $scope.pagination.pageIndex-1,
                                        "pageSize": $scope.pagination.pageSize
                                    })
                                };
                                //重置
                                $scope.resetBankFlow = function () {
                                    $scope.modalBankFlow = {
                                        "webUserCode":usercode,
                                        "webComCode":comCode,
                                        "comCode":""
                                    };
                                };
                                //关闭弹窗
                                $scope.cancel=function(){
                                    $modalInstance.dismiss();
                                };
                                //添加到列表
                                $scope.addList = function () {
                                    var sign = false;
                                    angular.forEach($scope.modalBankFlowList,function (data,index,array) {
                                        if (data.changeClass=='venus_table_check'){
                                            data.thisClaimBankFlowAmout = data.canClaimAmount;//可认领交易金额赋给本次认领交易金额
                                            data.bankFlowClaimStatus=data.claimStatus;//认领状态字段转换
                                            data.isNoBill = localStatus;
                                            angular.forEach(reviseBankList,function (target){
                                                if(data.unifySerialNum == target.unifySerialNum){
                                                    sign = true;
                                                    return false
                                                }
                                            });
                                            if(sign){
                                                layerMsg("银行流水号已存在！");
                                                return false
                                            }
                                            reviseBankList.push(array[index]);
                                        }
                                    });
                                    $modalInstance.close();
                                };
                                //单选勾选
                                $scope.change = function (flag) {
                                    angular.forEach($scope.modalBankFlowList, function (data,index) {
                                        if (flag == index) {
                                            data.changeClass ='venus_table_check'
                                        }
                                        else {
                                            data.changeClass = ''
                                        }
                                    });
                                };
                                //导入银行账号
                                $scope.myFunc = function(){
                                    $scope.comcodes = $scope.modalBankFlow.comCode;
                                    //导入目标银行账号-币别
                                    $$claimChange.queryBankAcount($scope.comcodes,{
                                        success: function (data) {
                                            var payWayObj = {};
                                            var payWaySelList = [];
                                            $.each(data.content,function(index,obj){
                                                payWayObj['code'] = obj.bankAccountNo;
                                                payWayObj['value'] = obj.bankAccountNo+'-'+obj.currency;
                                                payWaySelList.push(angular.copy(payWayObj));
                                            })
                                            $scope.bankTypeCNY = payWaySelList;
                                        },
                                        error: function (e) {

                                        }
                                    });
                                }
                            }
                        }).result.then(function (record) {
                            $scope.selectAdd()
                        });
                    };
                    //金额校验
                    $scope.judgmentSum = function (target){
                        if (Number(target.thisClaimBankFlowAmout) > Number(target.canClaimAmount)){
                            layerMsg("本次认领交易金额不能大于可认领交易金额!");
                            target.thisClaimBankFlowAmout =target.canClaimAmount;
                            return false
                        }
                    };
                    $scope.$watch('changeClaimCondition.prpJClaimBankFlowDetallDtoList',function () {
                        $scope.selectAdd()
                    },true);
                    //累加金额
                    $scope.selectAdd = function () {
                        var paymentFee = 0;
                        var bankFlowFee = 0;
                        angular.forEach($scope.changeClaimCondition.prpJClaimTransactionMainDtoList, function (data) {
                            paymentFee += Number(data.thisClaimSumFeeCny);
                        });
                        angular.forEach($scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList, function (data) {
                            bankFlowFee += Number(data.thisClaimBankFlowAmout);
                        });
                        $scope.modalPaymentFee = paymentFee;
                        $scope.modalBankFlowFee = bankFlowFee;
                    };
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchClaimChange(true)
                }
            });
        };
        /**
         * 认领撤销
         */
        $scope.claimCancelInfo = function (target) {
            target.webUserCode = $scope.usercode;
            target.webComCode = $scope.comCode;
            $modal.open({
                templateUrl: 'components/collection/claimChange/tpl/modal/claimCancelInfo.modal.html',
                resolve: {
                    target:function () {
                        return target
                    },
                    usercode: function () {
                        return $scope.usercode
                    },
                    comCode: function () {
                        return $scope.comCode
                    }
                },
                controller: function ($scope, $modalInstance,target,usercode,comCode) {
                    //初始化
                    var init = function(){
                        $scope.changeClaimCondition = {
                            "prpJClaimTransactionMainDtoList":[],
                            "prpJClaimBankFlowDetallDtoList":[]
                        };
                        //查询详情
                        $$claimChange.lookClaimChange(target,{
                            success: function (data) {
                                console.log(data);
                                $scope.changeClaimCondition = data.content;
                                $scope.changeClaimCondition.webUserCode =usercode;
                                $scope.changeClaimCondition.webComCode = comCode;
                                $scope.selectAdd();
                            },
                            error: function (e) {
                            }
                        });
                    };
                    init();
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //认领撤销
                    $scope.claimReturn = function () {
                        $$claimChange.claimReturn($scope.changeClaimCondition,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode == "0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close();
                                }else{
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        });
                    };
                    //累加金额
                    $scope.selectAdd = function () {
                        var paymentFee = 0;
                        var bankFlowFee = 0;
                        angular.forEach($scope.changeClaimCondition.prpJClaimTransactionMainDtoList, function (data) {
                            paymentFee += Number(data.thisClaimSumFeeCny);
                        });
                        angular.forEach($scope.changeClaimCondition.prpJClaimBankFlowDetallDtoList, function (data) {
                            bankFlowFee += Number(data.thisClaimBankFlowAmout);
                        });
                        $scope.modalPaymentFee = paymentFee;
                        $scope.modalBankFlowFee = bankFlowFee;
                    };
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchClaimChange(true)
                }
            });
        };
        /**
         *缴费通知单号查询业务单号
         */
        $scope.searchCertiNo = function (target) {
            $modal.open({
                templateUrl: 'components/collection/nonFeesCollection/tpl/modal/lookInfo.modal.html',
                resolve: {
                    target:function () {
                        return target
                    },
                    usercode:function () {
                        return $scope.usercode
                    }
                },
                controller: function ($scope, $modalInstance,target,usercode) {
                    $scope.paymentNoticeCondition = target;
                    //关闭弹窗
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    };
                    //列表查询
                    $scope.searchpaymentNoticeList = function(){
                        target.globalUserCode = usercode;
                        $$claimChange.paymentNoticeListInfo(target,{
                            success:function (data) {
                                console.log(data)
                                $scope.paymentNoticeList = data.content.content[0].prpJunjfcdplanDtoList;
                                $scope.paymentNoticeCondition.totalItems = data.content.content[0].prpJunjfcdplanDtoList.length;
                            },
                            error:function () {

                            }
                        })
                    }
                    $scope.searchpaymentNoticeList();
                }
            }).result.then(function (record) {
            });
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('claimChange');//获取上次数据
            if(localDada){
                $scope.pagination = localDada.pagination;
                $scope.moreFlag = localDada.moreFlag;
                $scope.claimChangeCondition = localDada.claimChangeCondition;
                $scope.claimChangeList = localDada.claimChangeList;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            $scope.claimChange = {};
            $scope.claimChange.pagination = $scope.pagination;
            $scope.claimChange.moreFlag = $scope.moreFlag;
            $scope.claimChange.claimChangeCondition = $scope.claimChangeCondition;
            $scope.claimChange.claimChangeList = $scope.claimChangeList;
            mcMultiEditorCacheService.localData('claimChange',$scope.claimChange);//存储数据
        };
        /**
         * 切换高级与普通查询
         */
        $scope.changeFlag = function () {
            $scope.moreFlag = !$scope.moreFlag;
            saveData();
        };
        /**
         * 初始化函数
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            $scope.claimChangeCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":"payment.collection.claimmanagement.claimchange",
                "transactionNo":"",
                "tradingNo":"",
                "inputDateFrom":"",
                "inputDateTo":"",
                "claimStatus":"2",
                "certiNo":""
            };
            getLastData();//获取上次数据
            saveData();
        };
        init();
    };

    moduleApp.controller('ClaimChangeCtrl', ['$scope', '$$claimChange','$modal','mcMultiEditorCacheService',claimChange]);

});
