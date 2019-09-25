/**
 * Created by martin on 2017/11/14.
 * 运维管理-挂帐管理-应收保费挂帐
 */
define([
    '../module',
    'config'
],function (moduleApp,config) {
    'use strict';
    var InsuranceReceivables=function($scope,$modal,$$InsuranceReceivablesend,mcMultiEditorCacheService) {
        /**
         * 应收保费挂帐确认
         */
        $scope.acknowledgementClass = function(target){
            //添登录机构
            //$scope.Receivables.globalUserCode=$scope.usercode;
            //$scope.Receivables.powerSystemCode=$scope.centerCode;
            if($scope.Receivables.yearMonth == undefined||$scope.Receivables.yearMonth == ''){
                layer.msg("请录入日期");
            }else{
                $$InsuranceReceivablesend.transaccount($scope.Receivables,{
                    success:function (data) {
                        if(data.resultCode=='0000'){
                            layer.alert(data.resultMsg,{icon:1})
                        }else{
                            layer.alert(data.resultMsg,{icon:2})
                            return;
                        }
                    },
                    error:function () {
                    }
                },{
                    "pageNo": $scope.pagination.pageIndex-1,
                    "pageSize": $scope.pagination.pageSize
                })
            }
        };
        /**
         *  挂账详情
         */
        $scope.settlementClass = function(target){
            //添登录机构
            //$scope.Receivables.globalUserCode=$scope.usercode;
            //$scope.Receivables.powerSystemCode=$scope.centerCode;
            if($scope.Receivables.yearMonth == undefined||$scope.Receivables.yearMonth == ''){
                layer.msg("请录入日期");
            }else{
                $$InsuranceReceivablesend.transaccount($scope.Receivables,{
                    success:function (data) {
                        if(data.resultCode=='0000'){
                            layer.alert(data.resultMsg,{icon:1})
                        }else{
                            layer.alert(data.resultMsg,{icon:2})
                            return;
                        }
                    },
                    error:function () {
                    }
                },{
                    "pageNo": $scope.pagination.pageIndex-1,
                    "pageSize": $scope.pagination.pageSize
                })
            }
        };
        //重置
        $scope.reset = function(){
            $scope.Receivables={
                "businessType":"",//挂账类型
                "yearMonth":""//挂账日期
            };
        };
        /**
         * 初始化函数
         */
        var init=function(){
            //初始化对象，属性
            $scope.Receivables={
                "businessType":"",//收付类型
                "yearMonth":"",//挂账日期
                "centerCode":$scope.centerCode,
                "userCode":$scope.usercode//用户代码
            };
            //分页
            $scope.pagination={
                totalItems:'',//总数
                pageIndex:1,//当前页面
                pageSize:'15',//显示条数
                maxSize:'3',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$InsuranceReceivablesend.Account().infoToView;
            }
            $scope.tapName = $scope.infoToView.tapName;
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            mcMultiEditorCacheService.localData('sendFinancialMenu',$scope.Receivables);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('sendFinancialMenu');
        };
        /**
         * tap切换
         */
        $scope.changeTap = function (index) {
            $scope.reset();
            $scope.infoToView.tapFlag = index;
            saveData();
        };
        init();
    };
    moduleApp.controller('InsuranceReceivablesCtrl',['$scope','$modal','$$InsuranceReceivablesend','mcMultiEditorCacheService',InsuranceReceivables]);
});
