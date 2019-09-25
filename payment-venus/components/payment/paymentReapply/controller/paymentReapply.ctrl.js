/**
 * 交易失败结算单查询及支付申请控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var PaymentReapplyCtrl=function($scope,$$paymentReapply,mcMultiEditorCacheService,$modal){
        console.log('交易失败结算单查询及支付申请控制器...');
        /**
         * 查询
         */
        $scope.searchList = function (target) {
            if(target!='page'){
                $scope.paymentReapply.pagination.pageIndex=1;
            }
            $scope.paymentReapply.paymentReapplyCondition.webUserCode = $scope.usercode;
            $scope.paymentReapply.paymentReapplyCondition.webComCode = $scope.comCode;
            $scope.paymentReapply.paymentReapplyCondition.webCenterCode = $scope.centerCode;
            $$paymentReapply.searchReapplyList($scope.paymentReapply.paymentReapplyCondition,{
                success: function (data) {
                    $scope.paymentReapply.paymentReapplyList = data.content.content;
                    if(!target&&$scope.paymentReapply.paymentReapplyList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.paymentReapply.pagination.totalItems = data.content.totalCount;
                    $scope.paymentReapply.status.allChecked = false;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.paymentReapply.pagination.pageIndex-1,
                "pageSize": $scope.paymentReapply.pagination.pageSize
            });
        };
        /**
         * 重置
         */
        $scope.resetForm = function () {
            $scope.paymentReapply.paymentReapplyCondition = {};
        };
        /**
         * 全选
         */
        $scope.checkedAll = function () {
            angular.forEach($scope.paymentReapply.paymentReapplyList,function (data) {
                if ($scope.paymentReapply.status.allChecked){
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
            $scope.paymentReapply.status.allChecked = $scope.paymentReapply.paymentReapplyList.every(function (data) {
                return data.checked;
            })
        };
        /**
         * 重新申请
         */
        $scope.payReapply=function () {
            $scope.confirmList = {"list":[]};
            angular.forEach($scope.paymentReapply.paymentReapplyList,function (data,index,array) {
                if(data.checked){
                    $scope.confirmList.list.push(array[index])
                }
            });
            if ($scope.confirmList.list.length == 0){
                layerMsg("请勾选一条记录！")
            }else {
                $scope.confirmList.comCode =$scope.comCode;
                $scope.confirmList.operatorCode =$scope.usercode;
                $$paymentReapply.payReapply($scope.confirmList,{
                    success: function (data) {
                        if(data.content.resultCode == "0000"){
                            layerMsg("重新申请批次号为"+data.content.resultMsg,'success');
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
                templateUrl:"components/payment/paymentReapply/tpl/modal/paymentReapply.modal.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $$paymentReapply.searchVisaSerialNoList(target,{
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
            var localDada=mcMultiEditorCacheService.localData('paymentReapply');//获取上次数据
            if(localDada){
                $scope.paymentReapply=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('paymentReapply',$scope.paymentReapply);//存储数据
        };
        /**
         * 初始化函数
         */
        var init = function () {
            $scope.paymentReapply = $$paymentReapply.paymentReapply();
            getLastData();
            saveData();
        };
        init();


    };
    moduleApp.controller('PaymentReapplyCtrl',['$scope','$$paymentReapply','mcMultiEditorCacheService','$modal',PaymentReapplyCtrl]);
});