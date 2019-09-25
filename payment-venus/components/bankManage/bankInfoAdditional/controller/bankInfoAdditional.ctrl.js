/**
 *银行信息补录控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var bankInfoAdditional=function($scope,$$bankInfoAdditional,mcMultiEditorCacheService){
        /**
         *查询
         */
        $scope.searchSupplement = function (target) {
            if(target!='page'){
                $scope.bankInfoAdditional.pagination.pageIndex=1;
            }
            if($scope.bankInfoAdditional.supplementCondition.transDate!=""&&$scope.bankInfoAdditional.supplementCondition.transDateEnd!=""&&$scope.bankInfoAdditional.supplementCondition.transDate>$scope.bankInfoAdditional.supplementCondition.transDateEnd){
                layerMsg("起始日期不能大于终止日期！");
                return false
            }
            if($scope.bankInfoAdditional.supplementCondition.amount!=""&&$scope.bankInfoAdditional.supplementCondition.amountEnd!=""&&Number($scope.bankInfoAdditional.supplementCondition.amount)>Number($scope.bankInfoAdditional.supplementCondition.amountEnd)){
                layerMsg("起始交易金额不能大于终止交易金额！");
                return false
            }
            $$bankInfoAdditional.find('searchSupplement',{
                "unifySerialNum":$scope.bankInfoAdditional.supplementCondition.unifySerialNum,
                "serialNum":$scope.bankInfoAdditional.supplementCondition.serialNum,
                "comCode":$scope.bankInfoAdditional.supplementCondition.comCode,
                "bankAccount":$scope.bankInfoAdditional.supplementCondition.bankAccount,
                "paymentName":$scope.bankInfoAdditional.supplementCondition.paymentName,
                "currency":$scope.bankInfoAdditional.supplementCondition.currency,
                "amount":$scope.bankInfoAdditional.supplementCondition.amount,
                "amountEnd":$scope.bankInfoAdditional.supplementCondition.amountEnd,
                "claimStatus":$scope.bankInfoAdditional.supplementCondition.claimStatus,
                "transDate":$scope.bankInfoAdditional.supplementCondition.transDate,
                "transDateEnd":$scope.bankInfoAdditional.supplementCondition.transDateEnd,
                "globalUserCode":$scope.usercode
            },{
                success:function (data) {
                    console.log(data);
                    $scope.bankInfoAdditional.supplementList = data.content.content;
                    if($scope.bankInfoAdditional.supplementList.length == 0){
                        layerMsg("暂无数据！")
                    }
                    $scope.bankInfoAdditional.pagination.totalItems = data.content.totalCount;
                    $scope.bankInfoAdditional.status.CheckedAll = false;//初始化全选框
                },error: function (e) {
                }
            },{
                "pageNo": $scope.bankInfoAdditional.pagination.pageIndex-1,
                "pageSize": $scope.bankInfoAdditional.pagination.pageSize
            })
        };
        /**
         *重置
         */
        $scope.resetSupplement = function () {
            $scope.bankInfoAdditional.supplementCondition = {};
        };
        /**
         * 全选
         */
        $scope.checkedSupplementConditionAll = function () {
            angular.forEach($scope.bankInfoAdditional.supplementList,function (data) {
                if ($scope.bankInfoAdditional.status.CheckedAll){
                    data.checked = true
                }else {
                    data.checked = false
                }
            })
        };
        /**
         * 单选
         */
        $scope.checkedSupplementConditionOne = function () {
            $scope.bankInfoAdditional.status.CheckedAll = $scope.bankInfoAdditional.supplementList.every(function (data) {
                return data.checked;
            })
        };
        /**
         *提交
         */
        $scope.submitSupplement = function () {
            $scope.submitSupplementList = {
                "list":[]
            };
            angular.forEach($scope.bankInfoAdditional.supplementList,function (data,index,array) {
                if (data.checked){
                    $scope.submitSupplementList.list.push(array[index])
                }
            });
            if ($scope.submitSupplementList.list.length == 0){
                layerMsg("请勾选一条记录！");
                return false;
            }
            var layersign = false;
            angular.forEach($scope.submitSupplementList.list,function (data) {
                if (data.claimStatus == 1 || data.claimStatus == 2){
                    layersign = true;
                }
            });
            if(layersign){
                layerMsg("只能提交未认领的数据！");
                return false
            }
            $$bankInfoAdditional.submitSupplementData($scope.submitSupplementList,{
                success:function (data) {
                    console.log(data);
                    if(data.content.resultCode == "0000"){
                        layer.msg(data.content.resultMsg, {icon: 1});
                        $scope.searchSupplement();
                    }else {
                        layerMsg(data.content.resultMsg)
                    }
                },error: function (e) {

                }
            })
        };
        //导入银行账号
        $scope.myFunc = function(){
            $scope.comcodes = $scope.bankInfoAdditional.supplementCondition.comCode;
            //导入目标银行账号-币别
            $$bankInfoAdditional.queryBankAcount($scope.comcodes,{
                success: function (data) {
                    var payWayObj = {};
                    var payWaySelList = [];
                    $.each(data.content,function(index,obj){
                        payWayObj['code'] = obj.bankAccountNo;
                        payWayObj['value'] = obj.bankAccountNo+'-'+obj.currency;
                        payWaySelList.push(angular.copy(payWayObj));
                    });
                    $scope.bankTypeCNY = payWaySelList;
                },
                error: function (e) {

                }
            });
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('bankInfoAdditional');//获取上次数据
            if(localDada){
                $scope.bankInfoAdditional=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('bankInfoAdditional',$scope.bankInfoAdditional);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.bankInfoAdditional = $$bankInfoAdditional.bankInfoAdditional();
            $scope.accountcomCode = $scope.centerCode;
            getLastData();
            saveData();
        };
        init();

    };

    moduleApp.controller('BankInfoAdditionalCtrl',['$scope','$$bankInfoAdditional','mcMultiEditorCacheService',bankInfoAdditional]);

});
