/**
 * 结算单支付确认控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var PaymentConfirmCtrl=function($scope,$$paymentConfirm,mcMultiEditorCacheService,$modal){
        console.log('结算单支付确认控制器...');
        /**
         * 查询
         */
        $scope.searchList = function (target) {
            if(target!='page'){
                $scope.paymentConfirm.pagination.pageIndex=1;
            }
            $scope.paymentConfirm.paymentConfirmationCondition.webUserCode = $scope.usercode;
            $scope.paymentConfirm.paymentConfirmationCondition.webComCode = $scope.comCode;
            $scope.paymentConfirm.paymentConfirmationCondition.webCenterCode = $scope.centerCode;
            $$paymentConfirm.paymentConfirmList($scope.paymentConfirm.paymentConfirmationCondition,{
                success: function (data) {
                    $scope.paymentConfirm.paymentConfirmationList = data.content.content;
                    if(!target&&$scope.paymentConfirm.paymentConfirmationList.length == 0){
                        layerMsg("暂无数据！")
                    }
                    $scope.paymentConfirm.pagination.totalItems = data.content.totalCount;
                    $scope.paymentConfirm.status.allChecked = false;
                    calculate();
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.paymentConfirm.pagination.pageIndex-1,
                "pageSize": $scope.paymentConfirm.pagination.pageSize
            });
        };

        /**
         * 重置
         */
        $scope.resetForm = function () {
            $scope.paymentConfirm.paymentConfirmationCondition = {};
        };
        var calculate = function () {
            var sum = 0;
            var tax = 0;
            var pack =0;
            angular.forEach($scope.paymentConfirm.paymentConfirmationList,function (data,index,array) {
                if(data.checked){
                    sum = sum+Number(data.taxDisFee);
                    tax = tax+Number(data.vatFee);
                    pack = pack+Number(data.payCommission);
                }
            });
            $scope.paymentConfirm.status.sumFee = sum;
            $scope.paymentConfirm.status.taxFee = tax;
            $scope.paymentConfirm.status.packFee = pack;
        };
        /**
         * 全选
         */
        $scope.checkedAll = function () {
            angular.forEach($scope.paymentConfirm.paymentConfirmationList,function (data) {
                if ($scope.paymentConfirm.status.allChecked){
                    data.checked = true
                }else {
                    data.checked = false
                }
            })
        };
        /**
         * 单选
         */
        $scope.checkedOne = function () {
            $scope.paymentConfirm.status.allChecked = $scope.paymentConfirm.paymentConfirmationList.every(function (data) {
                return data.checked;
            })
        };

        /**
         * 勾选累加金额
         */
        $scope.changeSelectNumClass = function () {
            calculate();
        };

        /**
         * 确认通过
         */
        $scope.payPass=function () {
            $scope.confirmList = {"list":[]};
            angular.forEach($scope.paymentConfirm.paymentConfirmationList,function (data,index,array) {
                if(data.checked){
                    $scope.confirmList.list.push(array[index])
                }
            });
            if ($scope.confirmList.list.length == 0){
                layerMsg("请勾选一条记录！")
            }else {
                $scope.confirmList.operatorCode = $scope.usercode;
                $$paymentConfirm.confirmPay($scope.confirmList,{
                    success: function (data) {
                        if(data.content.resultCode == "0000"){
                            layer.msg(data.content.resultMsg,{icon:1});
                            $scope.searchList(true);
                        }else {
                            layerMsg(data.content.resultMsg)
                        }
                    },
                    error: function (e) {
                    }
                });
            }
        };

        /**
         * 支付失败打回
         */
        $scope.payFail=function () {
            $scope.confirmList = {"list":[]};
            angular.forEach($scope.paymentConfirm.paymentConfirmationList,function (data,index,array) {
                if(data.checked){
                    $scope.confirmList.list.push(array[index])
                }
            });
            if ($scope.confirmList.list.length == 0) {
                layerMsg('请勾选一条记录！');
            } else {
                $scope.confirmList.failReason = $scope.paymentConfirm.paymentConfirmationCondition.failReason;
                if($scope.confirmList.failReason ==""){
                    layerMsg('请填写失败原因');
                }else{
                    $$paymentConfirm.failPay($scope.confirmList,{
                        success: function (data) {
                            if(data.content.resultCode == "0000"){
                                layer.msg(data.content.resultMsg,{icon:1});
                                $scope.searchList(true);
                                $scope.paymentConfirm.paymentConfirmationCondition.failReason="";
                            }else{
                                layerMsg(data.content.resultMsg)
                            }
                        },
                        error: function (e) {
                        }
                    });
                }
            }
        };
        /**
         * 详细信息
         */
        $scope.moreFormData = function (target) {
            $modal.open({
                templateUrl:"components/payment/paymentConfirm/tpl/modal/paymentConfirm.modal.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $$paymentConfirm.searchContractNoList(target,{
                        success: function (data) {
                            $scope.visaSerialNoList = data.content;
                        },
                        error: function (e) {
                        }
                    });
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('paymentConfirm');//获取上次数据
            if(localDada){
                $scope.paymentConfirm=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('paymentConfirm',$scope.paymentConfirm);//存储数据
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.paymentConfirm.paymentConfirmationCondition.handler1Code='';
            $scope.paymentConfirm.paymentConfirmationCondition.businessMan=''
        };
        /**
         * 初始化函数
         */
        var init = function () {
            $scope.paymentConfirm = $$paymentConfirm.paymentConfirm();
            getLastData();
            saveData();
        };
        init();


    };
    moduleApp.controller('PaymentConfirmCtrl',['$scope','$$paymentConfirm','mcMultiEditorCacheService','$modal',PaymentConfirmCtrl]);
});