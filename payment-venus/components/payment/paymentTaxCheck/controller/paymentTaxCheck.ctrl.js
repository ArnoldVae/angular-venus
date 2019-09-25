/**
 * 税金复核控制器
 */
define([
    '../module',
    'config'
], function (moduleApp, config) {
    'use strict';
    var PaymentTaxCheckCtrl = function ($scope, $$paymentTaxCheck,mcMultiEditorCacheService) {
        console.log('税金复核控制器...');
        /**
         * 查询
         */
        $scope.searchTaxCheck = function (target) {
            if(target!='page'){
                $scope.paymentTaxCheck.pagination.pageIndex=1;
            }
            if ($scope.paymentTaxCheck.taxCheckDto.commisionType == "") {
                layerMsg("请选择费用类型！");
                return false
            }
            if ($scope.paymentTaxCheck.taxCheckDto.visaSerialNo == "") {
                layerMsg("请输入结算单号！");
                return false
            }
            $$paymentTaxCheck.find('searchTaxCheck', {
                "visaSerialNo": $scope.paymentTaxCheck.taxCheckDto.visaSerialNo,
                "commisionType": $scope.paymentTaxCheck.taxCheckDto.commisionType,
                "webUserCode":$scope.usercode,//当前登录人代码
                "webComCode":$scope.comCode,//当前登录机构代码
                "webCenterCode":$scope.centerCode//当前核算单位代码
            }, {
                success: function (data) {
                    if(data.content.content){
                        if(data.content.content.length==0){
                            layerMsg("暂无数据！");
                            return false
                        }
                        $scope.paymentTaxCheck.taxCheckList = data.content.content;
                        $scope.paymentTaxCheck.taxCheckCondition = data.content;
                        $scope.paymentTaxCheck.pagination.totalItems = data.content.totalCount;
                        $scope.paymentTaxCheck.saveFeeDto.planFee =$scope.paymentTaxCheck.taxCheckCondition.planFee;
                        $scope.paymentTaxCheck.saveFeeDto.vatFee =$scope.paymentTaxCheck.taxCheckCondition.vatFee;
                    }else{
                        layerMsg(data.content.resultMsg)
                    }
                },
                error: function (e) {
                }
            }, {
                "pageNo": $scope.paymentTaxCheck.pagination.pageIndex-1,
                "pageSize": $scope.paymentTaxCheck.pagination.pageSize
            })

        };
        /**
         * 复核
         */
        $scope.reviewTaxCheck = function () {
            $scope.paymentTaxCheck.taxCheckCondition.taxFeeApproveCode = $scope.usercode;
            var date = new Date();
            $scope.paymentTaxCheck.taxCheckCondition.taxFeeApproveDate = date.dateConversion();
            $scope.paymentTaxCheck.taxCheckCondition.visaSerialNo = $scope.paymentTaxCheck.taxCheckList[0].visaSerialNo;
            $$paymentTaxCheck.reviewTaxCheckData($scope.paymentTaxCheck.taxCheckCondition, {
                success: function (data) {
                    if (data.content.resultCode == "0000") {
                        layer.msg(data.content.resultMsg, {icon: 1});
                        $scope.paymentTaxCheck.taxCheckDto = {
                           "visaSerialNo": "",
                           "commisionType":"0"
                       };
                        $scope.paymentTaxCheck.taxCheckList =[];
                        $scope.paymentTaxCheck.taxCheckCondition = {};
                        $scope.paymentTaxCheck.pagination.totalItems = '';
                    }else {
                        layerMsg(data.content.resultMsg)
                    }
                },
                error: function (e) {
                }
            })
        };
        /**
         * 金额校验
         */
        $scope.countFee = function (target) {
            if(Number($scope.paymentTaxCheck.taxCheckCondition.planFee) - Number(target)>=0){
                $scope.paymentTaxCheck.taxCheckCondition.planFee = Number($scope.paymentTaxCheck.saveFeeDto.planFee) - Number(target);
                $scope.paymentTaxCheck.taxCheckCondition.vatFee = Number($scope.paymentTaxCheck.saveFeeDto.vatFee) + Number(target);
            }else {
                layerMsg("税费超出本次实付合计！请确认后重新输入");
                $scope.searchTaxCheck();
            }
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('paymentTaxCheck');//获取上次数据
            if(localDada){
                $scope.paymentTaxCheck=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('paymentTaxCheck',$scope.paymentTaxCheck);//存储数据
        };
        /**
         * 初始化函数
         */
        var init = function () {
            $scope.paymentTaxCheck = $$paymentTaxCheck.paymentTaxCheck();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('PaymentTaxCheckCtrl', ['$scope', '$$paymentTaxCheck', 'mcMultiEditorCacheService', '$modal', PaymentTaxCheckCtrl]);
});