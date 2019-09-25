/**
 * 账户信息修改控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var accountInfoModificationCtrl=function($scope,$$accountInfoModification,$modal,mcMultiEditorCacheService){
        /**
         * 查询
         */
        $scope.searchAccountInfo = function (target) {
            if(target!='page'){
                $scope.accountRevise.pagination.pageIndex=1;
            }
            $scope.accountRevise.accountInfoCondition.globalUserCode = $scope.usercode;
            $scope.accountRevise.accountInfoCondition.powerSystemCode = $scope.comCode;
            $$accountInfoModification.searchAccountInfo($scope.accountRevise.accountInfoCondition,{
                success: function (data) {
                    console.log(data);
                    $scope.accountRevise.accountInfoList = data.content.content;
                    if(!target&&$scope.accountRevise.accountInfoList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.accountRevise.pagination.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.accountRevise.pagination.pageIndex-1,
                "pageSize": $scope.accountRevise.pagination.pageSize
            })
        };
        /**
         * 重置
         */
        $scope.resetAccountInfo = function () {
            $scope.accountRevise.accountInfoCondition = {
                "globalUserCode":$scope.usercode,
                "powerSystemCode":$scope.comCode,
                "taskCode":"payment.unionpay.accountinfo"
            };
        };
        /**
         * 修改
         */
        $scope.reviseInfo = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/accountInfoModification/tpl/modal/reviseInfo.modal.html',
                resolve:{
                    userName:function () {
                        return $scope.userName
                    }
                },
                controller:function ($scope,$modalInstance,userName,$rootScope) {
                    $scope.accountSaveCondition = target;
                    $scope.accountSaveCondition.payRefNo = target.visaserialNo;
                    $scope.accountSaveCondition.userName = userName;
                    $scope.accountSaveCondition.powerSystemCode = $rootScope.centerCode;
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.saveAccount = function () {
                        // if($scope.accountSaveCondition.receiverfullname==null||$scope.accountSaveCondition.receiverfullname==""){
                        //     layerMsg("账号户名不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.mobilephone==null||$scope.accountSaveCondition.mobilephone==""){
                        //     layerMsg("手机号码不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.banktype==null||$scope.accountSaveCondition.banktype==""){
                        //     layerMsg("银行名称不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.bankprov==null||$scope.accountSaveCondition.bankprov==""){
                        //     layerMsg("省市不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.bank==null||$scope.accountSaveCondition.bank==""){
                        //     layerMsg("开户银行不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.certifytype==null||$scope.accountSaveCondition.certifytype==""){
                        //     layerMsg("证件类型不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.certifyno==null||$scope.accountSaveCondition.certifyno==""){
                        //     layerMsg("证件号码不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.accountflag==null||$scope.accountSaveCondition.accountflag==""){
                        //     layerMsg("卡折标识不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.accounttype==null||$scope.accountSaveCondition.accounttype==""){
                        //     layerMsg("公私标识不能为空！");
                        //     return false
                        // }
                        // if($scope.accountSaveCondition.bankaccount==null||$scope.accountSaveCondition.bankaccount==""){
                        //     layerMsg("账号/卡号不能为空！");
                        //     return false
                        // }
                        $$accountInfoModification.saveAccountRevise($scope.accountSaveCondition,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode=="0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close(data);
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    }
                }
            }).result.then(function (data) {
                if(data){
                    $scope.searchAccountInfo(true);
                }
            })
        };
        /**
         * 支付单号详情查看
         */
        $scope.lookVisaSerialNo = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/auditing/tpl/modal/lookVisaSerialNo.modal.html',
                resolve:{
                    target:function () {
                        return angular.copy(target)
                    }},
                controller:function ($scope,$modalInstance,target) {
                    $$accountInfoModification.lookVisaSerialNo(target,{
                        success: function (data) {
                            console.log(data);
                            $scope.visaSerialNoDto = data.content;
                        },
                        error: function (e) {
                        }
                    });
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
            var localDada=mcMultiEditorCacheService.localData('accountInfoModification');//获取上次数据
            if(localDada){
                $scope.accountRevise=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('accountInfoModification',$scope.accountRevise);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.accountRevise = $$accountInfoModification.accountInfoModification();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('accountInfoModificationCtrl',['$scope','$$accountInfoModification','$modal','mcMultiEditorCacheService',accountInfoModificationCtrl]);
});
