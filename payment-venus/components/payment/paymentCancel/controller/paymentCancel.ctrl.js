/**
 * 结算单作废控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var PaymentCancelCtrl=function($scope,$$paymentCancel,mcMultiEditorCacheService,$modal){
        console.log('结算单作废控制器...');
        /**
         * 查询
         */
        $scope.searchList = function (target) {
            if(target!='page'){
                $scope.paymentCancel.pagination.pageIndex=1;
            }
            $scope.paymentCancel.paymentCancelCondition.webUserCode = $scope.usercode;
            $scope.paymentCancel.paymentCancelCondition.webComCode = $scope.comCode;
            $scope.paymentCancel.paymentCancelCondition.webCenterCode = $scope.centerCode;
            $$paymentCancel.searchCancelList($scope.paymentCancel.paymentCancelCondition,{
                success: function (data) {
                    $scope.paymentCancel.paymentCancelList = data.content.content;
                    if(!target&&$scope.paymentCancel.paymentCancelList.length ==0){
                        layerMsg("暂无数据!")
                    }
                    $scope.paymentCancel.pagination.totalItems = data.content.totalCount;
                    $scope.paymentCancel.status.allChecked = false;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.paymentCancel.pagination.pageIndex-1,
                "pageSize": $scope.paymentCancel.pagination.pageSize
            });
        };
        /**
         * 重置
         */
        $scope.resetForm = function () {
            $scope.paymentCancel.paymentCancelCondition = {};
        };
        /**
         * 全选
         */
        $scope.checkedAll = function () {
            angular.forEach($scope.paymentCancel.paymentCancelList,function (data) {
                if ($scope.paymentCancel.status.allChecked){
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
            $scope.paymentCancel.status.allChecked = $scope.paymentCancel.paymentCancelList.every(function (data) {
                return data.checked;
            })
        };
        /**
         * 作废
         */
        $scope.payCancel=function () {
            $scope.confirmList = {"list":[]};
            angular.forEach($scope.paymentCancel.paymentCancelList,function (data,index,array) {
                if(data.checked){
                    $scope.confirmList.list.push(array[index])
                }
            });
            if ($scope.confirmList.list.length == 0){
                layerMsg("请勾选一条记录！")
            }else {
                $$paymentCancel.cancelPay($scope.confirmList,{
                    success: function (data) {
                        if(data.content.resultCode == "0000"){
                            layerMsg(data.content.resultMsg,'success');
                            $scope.searchList(true);
                        }else{
                            layerMsg(data.content.resultMsg)
                        }
                    },
                    error: function (e) {
                    }
                });
            }
        };

        /**
         * 详细信息
         */
        $scope.moreFormData = function (target) {
            $modal.open({
                templateUrl:"components/payment/paymentCancel/tpl/modal/paymentCancel.modal.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $$paymentCancel.searchVisaSerialNoList(target,{
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
            var localDada=mcMultiEditorCacheService.localData('paymentCancel');//获取上次数据
            if(localDada){
                $scope.paymentCancel=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('paymentCancel',$scope.paymentCancel);//存储数据
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.paymentCancel.paymentCancelCondition.handler1Code='';
            $scope.paymentCancel.paymentCancelCondition.businessMan=''
        };
        /**
         * 初始化函数
         */
        var init = function () {
            $scope.paymentCancel = $$paymentCancel.paymentCancel();
            getLastData();
            saveData();
        };
        init();


    };
    moduleApp.controller('PaymentCancelCtrl',['$scope','$$paymentCancel','mcMultiEditorCacheService','$modal',PaymentCancelCtrl]);
});