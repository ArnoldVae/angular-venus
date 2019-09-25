/**
 *认领确认控制器
 */
define([
    '../module'
], function (moduleApp) {
    'use strict';
    var claimConfirm = function ($scope, $$claimConfirm,$modal,mcMultiEditorCacheService) {
        /**
         * 查询
         */
        $scope.searchClaim = function (target) {
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            if($scope.centerCode=="02"){
                if($scope.claimConfirmCondition.tradingNo == ""&& $scope.claimConfirmCondition.inputDateFrom=="" && $scope.claimConfirmCondition.inputDateTo==""&&$scope.claimConfirmCondition.certiNo==""){
                    layerMsg("平台交易号、业务单号、登记日期不能同时为空！");
                    return false
                }
            }else {
                if($scope.claimConfirmCondition.transactionNo == ""&& $scope.claimConfirmCondition.inputDateFrom=="" && $scope.claimConfirmCondition.inputDateTo==""&&$scope.claimConfirmCondition.certiNo==""){
                    layerMsg("缴费通知单号、业务单号、登记日期不能同时为空！");
                    return false
                }
            }
            if($scope.claimConfirmCondition.inputDateFrom!=""&&$scope.claimConfirmCondition.inputDateTo!=""&&$scope.claimConfirmCondition.inputDateFrom>$scope.claimConfirmCondition.inputDateTo){
                layerMsg("起始登记日期不能大于终止登记日期！");
                return false
            }
            if($scope.claimConfirmCondition.sumFeeCnyFrom!=""&&$scope.claimConfirmCondition.sumFeeCnyTo!=""&&Number($scope.claimConfirmCondition.sumFeeCnyFrom)>Number($scope.claimConfirmCondition.sumFeeCnyTo)){
                layerMsg("起始金额不能大于终止金额！");
                return false
            }
            $$claimConfirm.searchClaimConfirm($scope.claimConfirmCondition,{
                success: function (data) {
                    console.log(data);
                    $scope.claimConfirmList = data.content.content;
                    if(!target&&$scope.claimConfirmList.length == 0){
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
         * 认领确认
         */
        $scope.confirmDetailedList = function (target) {
            target.webUserCode = $scope.usercode;
            target.webComCode = $scope.comCode;
            $modal.open({
                templateUrl: 'components/collection/claimConfirm/tpl/modal/detailedList.modal.html',
                resolve: {
                    target: function () {
                        return target
                    },
                    usercode: function () {
                        return $scope.usercode
                    },
                    comCode: function () {
                        return $scope.comCode
                    }
                },
                controller: function ($scope, $modalInstance,target,usercode,comCode,$rootScope) {
                    //查询详情
                    $$claimConfirm.lookClaimConfirm(target,{
                        success: function (data) {
                            console.log(data);
                            $scope.confirmClaimCondition = data.content;
                        },
                        error: function (e) {
                        }
                    });
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //确认认领
                    $scope.confirmClaim = function () {
                        if($scope.confirmClaimCondition.differenceAmout!="0"&&($scope.confirmClaimCondition.differenceSubjectCode ==null||$scope.confirmClaimCondition.differenceSubjectCode =="")){
                                layerMsg("请录入差额科目！");
                                return false
                        }
                        $scope.confirmClaimCondition.webUserCode =usercode;
                        $scope.confirmClaimCondition.webComCode = comCode;
                        $scope.confirmClaimCondition.webCenterComCode = $rootScope.user.centerCode;
                        $$claimConfirm.confirmClaim($scope.confirmClaimCondition,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode =="0000"){
                                    layerMsg(data.content.resultMsg+data.content.content,'success');
                                    $modalInstance.close(data.content.resultCode);
                                }else{
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        });
                    };
                    //认领打回
                    $scope.claimRepulse = function () {
                        $scope.confirmClaimCondition.webUserCode =usercode;
                        $scope.confirmClaimCondition.webComCode = comCode;
                        $scope.confirmClaimCondition.webCenterComCode = $rootScope.user.centerCode;
                        $$claimConfirm.claimRepulse($scope.confirmClaimCondition,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode =="0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close(data.content.resultCode);
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        });
                    }
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchClaim(true);
                }
            });
        };
        /**
         *重置
         */
        $scope.resetClaim = function () {
            $scope.claimConfirmCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":"payment.collection.claimmanagement.claimconfir",
                "claimStatus":"1",//只能查询预认领
                "transactionNo":"",
                "tradingNo":"",
                "inputDateFrom":"",
                "inputDateTo":"",
                "certiNo":""
            };
            saveData();
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
                        $$claimConfirm.paymentNoticeListInfo(target,{
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
            var localDada=mcMultiEditorCacheService.localData('claimConfirm');//获取上次数据
            if(localDada){
                $scope.pagination = localDada.pagination;
                $scope.moreFlag = localDada.moreFlag;
                $scope.claimConfirmCondition = localDada.claimConfirmCondition;
                $scope.claimConfirmList = localDada.claimConfirmList;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            $scope.claimConfirm = {};
            $scope.claimConfirm.pagination = $scope.pagination;
            $scope.claimConfirm.moreFlag = $scope.moreFlag;
            $scope.claimConfirm.claimConfirmCondition = $scope.claimConfirmCondition;
            $scope.claimConfirm.claimConfirmList = $scope.claimConfirmList;
            mcMultiEditorCacheService.localData('claimConfirm',$scope.claimConfirm);//存储数据
        };
        /**
         * 切换高级与普通查询
         */
        $scope.changeFlag = function () {
            $scope.moreFlag = !$scope.moreFlag;
            saveData();
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.claimConfirmCondition.claimOperatorCode='';
            $scope.claimConfirmCondition.businessMan=''
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
            $scope.claimConfirmCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":"payment.collection.claimmanagement.claimconfir",
                "claimStatus":"1",//只能查询预认领
                "transactionNo":"",
                "tradingNo":"",
                "inputDateFrom":"",
                "inputDateTo":"",
                "certiNo":""
            };
            getLastData();//获取上次数据
            saveData();
        };
        init();
    };

    moduleApp.controller('ClaimConfirmCtrl', ['$scope', '$$claimConfirm','$modal','mcMultiEditorCacheService',claimConfirm]);

});
