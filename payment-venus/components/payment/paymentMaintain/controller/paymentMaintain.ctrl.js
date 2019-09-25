/**
 * 税率维护控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var PaymentMaintainCtrl=function($scope,$$paymentMaintain,mcMultiEditorCacheService){
        console.log('税率维护控制器...');
        /**
         * 查询
         */
        $scope.searchTaxRate = function(){
            if($scope.paymentMaintain.taxRateDto.comCode == ""){
                layerMsg("请输入归属机构！")
            }else{
                $$paymentMaintain.find('searchTaxRate',{
                    'comCode':$scope.paymentMaintain.taxRateDto.comCode,
                    "webUserCode":$scope.usercode,//当前登录人代码
                    "webComCode":$scope.comCode,//当前登录机构代码
                    "webCenterCode":$scope.centerCode//当前核算单位代码
                },{
                    success: function (data) {
                        if(data.content.resultCode&&data.content.resultCode == "9999"){
                            layerMsg(data.content.resultMsg)
                        }
                        $scope.paymentMaintain.taxRateCondition = data.content;
                    },
                    error: function (e) {
                    }
                })
            }
        };
        /**
         * 重置
         */
        $scope.resetTaxRate = function () {
            $scope.searchTaxRate();
        };
        /**
         * 保存
         */
        $scope.preservationTaxRate = function () {
            if($scope.paymentMaintain.taxRateCondition.comCode==undefined){
                layerMsg("请先查询机构税率，然后保存修改!");
                return false
            }
            if($scope.paymentMaintain.taxRateCondition.validDate==""){
                layerMsg("启用日期不能为空！");
                return false
            }
            $$paymentMaintain.preservationTaxRateData($scope.paymentMaintain.taxRateCondition,{
                success:function (data) {
                    if(data.content.resultCode == "0000"){
                        layer.msg(data.content.resultMsg,{icon:1});
                        init();
                    }else {
                        layerMsg(data.content.resultMsg)
                    }
                },
                error:function () {

                }
            })
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('paymentMaintain');//获取上次数据
            if(localDada){
                $scope.paymentMaintain=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('paymentMaintain',$scope.paymentMaintain);//存储数据
        };
        /**
         * 启用日期校验
         */
        $scope.checkDate = function () {
            var date = new Date();
            if($scope.paymentMaintain.taxRateCondition.validDate<date.dateConversion()){
                layerMsg("启用日期不能小于当前日期！");
                $scope.paymentMaintain.taxRateCondition.validDate = date.dateConversion()
            }
        };
        /**
         * 初始化
         */
        var init = function () {
            $scope.paymentMaintain =$$paymentMaintain.paymentMaintain();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('PaymentMaintainCtrl',['$scope','$$paymentMaintain', 'mcMultiEditorCacheService',PaymentMaintainCtrl]);
});