/**
 * Created by martin on 2017/11/14.
 * 运维管理-挂帐管理-应收保费挂帐
 */
define([
    '../module',
    'config'
],function (moduleApp,config) {
    'use strict';
    var InsuranceReceivables=function($scope,$modal,$$InsuranceReceivables,mcMultiEditorCacheService) {
        /**
         * 应收保费挂帐确认
         */
        $scope.queryDetail = function(target){
            //添登录机构
            $scope.Receivables.userCode=$scope.usercode;
            $scope.Receivables.centerCode=$scope.centerCode;
            if($scope.Receivables.yearMonth == undefined||$scope.Receivables.yearMonth == ''){
                layer.msg("请录入日期");
            }else if($scope.Receivables.businessType == undefined||$scope.Receivables.businessType == ''){
                layer.msg("请录入挂账类型");
            }else{
                $$InsuranceReceivables.transaccount($scope.Receivables,{
                    success:function (data) {
                        if(data.resultCode=='0000'){
                            if(data.vouResponseInfos.length<0){
                                layerMsg('暂无数据！');
                                return false;
                            }
                            $scope.gzList=data.vouResponseInfos;
                        } else {
                            layerMsg(data.resultMsg)
                        }
                    },
                    error:function () {
                    }
                })
            }
        };
        /**
         *  挂账详情
         */
        $scope.showGZDetail=function (target) {
            $modal.open({
                templateUrl: 'components/OperationManagement/InsuranceReceivables/tpl/modal/voucherReceivableList.modal.tpl.html',
                resolve: {
                    target:function () {
                        return target
                    },
                    pagination:function () {
                        return $scope.pagination
                    }
                },
                controller: function ($scope, $modalInstance,target,pagination) {
                    console.log(target);
                    $scope.pagination=pagination;
                    $$InsuranceReceivables.queryGZDetail({
                        "voucherNo":target
                    },{
                        success:function (data) {
                            $scope.paymentList = data.content.dailyPaymentCheckList;
                            $scope.paymentList2 = data.content;
                            $scope.pagination.totalItems2=$scope.paymentList.length;
                        },
                        error:function () {
                        }
                    },{
                        "pageNo": $scope.pagination.pageIndex,
                        "pageSize": $scope.pagination.pageSize
                    });
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            });
        };
        //重置
        $scope.reset = function(){
            $scope.Receivables={
                "businessType":"",//挂账类型
                "yearMonth":""//挂账日期
            };
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('InsuranceReceivables');//获取上次数据
            if(localDada){
                $scope.Receivables=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('InsuranceReceivables',$scope.Receivables);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function(){
            //初始化对象，属性
            $scope.Receivables={
                "businessType":"",//挂账类型
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
            getLastData();//如果数据保存过，获取上次数据
            saveData();//储存数据
        };
        init();
    };
    moduleApp.controller('InsuranceReceivablesCtrl',['$scope','$modal','$$InsuranceReceivables','mcMultiEditorCacheService',InsuranceReceivables]);
});
