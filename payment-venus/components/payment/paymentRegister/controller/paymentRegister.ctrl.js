/**
 * 结算单支付申请控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var PaymentRegisterCtrl=function($scope,$$paymentRegister,mcMultiEditorCacheService,$modal){
        console.log('结算单支付申请控制器...')
        /**
         * 查询
         */
        $scope.searchSettlementForm = function (target) {
            if(target!='page'){
                $scope.paymentRegister.pagination.pageIndex=1;
            }
            $$paymentRegister.find('searchSettlementForm',{
                "visaSerialNoStart":$scope.paymentRegister.settlementFormCondition.visaSerialNoStart,
                "visaSerialNoEnd":$scope.paymentRegister.settlementFormCondition.visaSerialNoEnd,
                "comCode":$scope.paymentRegister.settlementFormCondition.comCode,
                "handler1Code":$scope.paymentRegister.settlementFormCondition.handler1Code,
                "agentCode":$scope.paymentRegister.settlementFormCondition.agentCode,
                "businessNature":$scope.paymentRegister.settlementFormCondition.businessNature,
                "certiType":$scope.paymentRegister.settlementFormCondition.certiType,
                "visaSerialNoList":$scope.paymentRegister.settlementFormCondition.visaSerialNoList,
                "packCode":$scope.paymentRegister.settlementFormCondition.packCode,
                "packDateStart":$scope.paymentRegister.settlementFormCondition.packDateStart,
                "packDateEnd":$scope.paymentRegister.settlementFormCondition.packDateEnd,
                "webUserCode":$scope.usercode,//当前登录人代码
                "webComCode":$scope.comCode,//当前登录机构代码
                "webCenterCode":$scope.centerCode//当前核算单位代码
            },{
                success: function (data) {
                    $scope.paymentRegister.settlementFormList = data.content.content;
                    $scope.paymentRegister.status.disabledAll=getAllStatus($scope.paymentRegister.settlementFormList);
                    if(!target&&$scope.paymentRegister.settlementFormList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.paymentRegister.pagination.totalItems = data.content.totalCount;
                    $scope.paymentRegister.status.settlementFormCheckedAll = false;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.paymentRegister.pagination.pageIndex-1,
                "pageSize": $scope.paymentRegister.pagination.pageSize
            })
        };
        /**
         * 重置
         */
        $scope.resetSettlementForm = function () {
            $scope.paymentRegister.settlementFormCondition = {};
        };
        /**
         * 全选
         */
        $scope.checkedsettlementFormAll = function () {
            angular.forEach($scope.paymentRegister.settlementFormList,function (data) {
                if ($scope.paymentRegister.status.settlementFormCheckedAll){
                    data.checked = true
                }else {
                    data.checked = false
                }

            })
        };
        /**
         * 单选
         */
        $scope.checkedsettlementFormOne = function () {
            checkList($scope.paymentRegister.settlementFormList);
            $scope.paymentRegister.status.settlementFormCheckedAll = $scope.paymentRegister.settlementFormList.every(function (data) {
                return data.checked;
            })
        };
        /**
         * 判断是否可以同时勾选
         */
        var checkValueOfList=function (objSt,_obj) {
            var result=false;
            if(_obj.currency2!=objSt.currency2){
                result=false
            }else{
                result=true
            }
            return result;
        };
        var getAllStatus=function (list) {
            var result=false;
            var _objSt=list[0];
            $.each(list,function (index,obj) {
                if(!checkValueOfList(_objSt,obj)){
                    result=true;
                    return false
                }else{
                    result=false;
                }
            });
            return result;
        };
        var checkList=function (list) {
            var objSt={};
            $.each(list,function (index,obj) {
                if(obj.checked){
                    objSt=obj;
                    return false;
                }
            });
            $.each(list,function (index,_obj) {
                if(objSt.checked){
                    if(!checkValueOfList(objSt,_obj)){
                        _obj.disabled=true
                    }else{
                        _obj.disabled=false
                    }
                }else {
                    _obj.disabled=false;
                }
            })
        };
        /**
         * 确定
         */
        $scope.confirmSettlementForm = function () {
            $scope.confirmList = {"list":[]};
            angular.forEach($scope.paymentRegister.settlementFormList,function (data,index,array) {
                if(data.checked){
                    $scope.confirmList.list.push(array[index])
                }
            });
            if ($scope.confirmList.list.length == 0){
                layerMsg("请勾选一条记录！")
            }else {
                $scope.confirmList.comCode = $scope.comCode;
                $scope.confirmList.operatorCode = $scope.usercode;
                $$paymentRegister.confirmSettlementFormData($scope.confirmList,{
                    success: function (data) {
                        if(data.content.resultCode == "0000"){
                            layerMsg("结算单批次号"+"<a>"+data.content.resultMsg+"</a>",'success');
                            $scope.searchSettlementForm(true);
                        }else {
                            layerMsg(data.content.resultMsg)
                        }
                    },
                    error: function (e) {
                    }
                })
            }
        };
        /**
         * 详细信息
         */
        $scope.moreSettlementFormData = function (target) {
            $modal.open({
                templateUrl:"components/payment/paymentRegister/tpl/modal/paymentRegister.modal.tpl.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $$paymentRegister.searchVisaSerialNoList(target,{
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
            var localDada=mcMultiEditorCacheService.localData('paymentRegister');//获取上次数据
            if(localDada){
                $scope.paymentRegister=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('paymentRegister',$scope.paymentRegister);//存储数据
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.paymentRegister.settlementFormCondition.handler1Code='';
            $scope.paymentRegister.settlementFormCondition.businessMan=''
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.paymentRegister = $$paymentRegister.paymentRegister();
            getLastData();
            saveData();
        };
        init();

    };
    moduleApp.controller('PaymentRegisterCtrl',['$scope','$$paymentRegister','mcMultiEditorCacheService','$modal',PaymentRegisterCtrl]);
});