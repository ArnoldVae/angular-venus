/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 代收代付撤销控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var feeInputInvoiceCondition=function($scope,$$collectingRevocation,mcMultiEditorCacheService){
        /**
         * 查询
         */
        $scope.searchRevocation = function (target) {
            if(!$scope.collectingRevocation.status.moreFlag){
                if(!$scope.collectingRevocation.info.transactionNo){
                    layer.msg('请输入缴费通知单！', {icon: 2});
                    return false;
                }
            }else if(!$scope.collectingRevocation.info.transactionNo &&!$scope.collectingRevocation.info.visaSerialNo &&!$scope.collectingRevocation.info.entrustTimeFrom){
                if($scope.collectingRevocation.info.entrustTimeTo){
                    layer.msg('请输入委托时间开始时间！', {icon: 2});
                    return false;
                }else{
                    layer.msg('请输入其中一项！', {icon: 2});
                    return false;
                }
            }else if($scope.collectingRevocation.info.entrustTimeFrom&& $scope.collectingRevocation.info.entrustTimeFrom>=$scope.collectingRevocation.info.entrustTimeTo){
                layer.msg('委托时间结束时间不能小于开始束时间！', {icon: 2});
                return false;
            }
            if(target!='page'){
                $scope.collectingRevocation.pagination.pageIndex=1;
            }
            $scope.collectingRevocation.info.webUserCode=$scope.usercode;
            $scope.collectingRevocation.info.webComCode = $scope.comCode;//登陆机构
            $scope.collectingRevocation.info.webCenterCode=$scope.centerCode;
            $scope.collectingRevocation.info.webTaskCode="payment.taskcollect.cancel";
            $$collectingRevocation.searchRevocation($scope.collectingRevocation.info,{
                success: function (data) {
                    $scope.confirmList=data.content.content;
                    $scope.collectingRevocation.pagination.totalItems=data.content.totalCount;
                    $scope.collectingRevocation.pagination.pageIndex=data.content.pages;
                    if($scope.confirmList.length<1){
                        layerMsg('暂无数据！');
                        return false
                    }
                },
                error: function (e) {
                }
            },{
                "pageNo":$scope.collectingRevocation.pagination.pageIndex-1,
                "pageSize":$scope.collectingRevocation.pagination.pageSize
            })
        };
        /**
         * 重置
         */
        $scope.reset = function () {
            $scope.collectingRevocation.info={
                "transactionNo":'',
                "visaSerialNo":'',
                "certiType":'01',
                "entrustTimeFrom":'',
                "entrustTimeTo":''
            };
        };
        /**
         *撤销
         */
        $scope.deleteMessage = function (target,index){
            $$collectingRevocation.deleteMessage(target,{
                success:function (data) {
                    if(data.code == "0000"){
                        $scope.confirmList.splice(index, 1);
                        layer.msg(data.content.entrustCancel, {icon: 1});
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
            var localDada=mcMultiEditorCacheService.localData('collectingRevocation');//获取上次数据
            if(localDada){
                $scope.collectingRevocation=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('collectingRevocation',$scope.collectingRevocation);//存储数据
        };
        /**
         * 初始化
         */
        var init=function () {
            $scope.collectingRevocation=$$collectingRevocation.Account();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('collectingRevocationCtrl',['$scope','$$collectingRevocation','mcMultiEditorCacheService',feeInputInvoiceCondition])
});