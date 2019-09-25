/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 代收代付申请控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var dailySetUpCondition=function($scope,$$dailySetUpInvoice,$modal,FileUploader,$$venus,$timeout,mcMultiEditorCacheService){
        /**
         * 初始化函数
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$dailySetUpInvoice.Account().infoToView;
                $scope.infoToView.newdailyQuery.comCode=$scope.centerCode;
                $scope.infoToView.dailyQuery.comcode=$scope.centerCode;
            }
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('dailySetUp',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('dailySetUp');
        };

        /**
         *查询
         */
        $scope.searchQuery = function (target) {
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            //先验证焦点定位
            $$venus.Focus(
                "premiumForm"
            ).then(
                function (Ele) {
                    if (angular.isDefined(Ele)) {
                        $timeout(function () {
                            Ele.focus();
                        },1000)
                    } else {
                        $$dailySetUpInvoice.collectionSearchs($scope.infoToView.dailyQuery,{
                            success: function (data) {
                                $scope.infoToView.addFlag = false;
                                $scope.infoToView.confirmList=data.content;
                                if($scope.infoToView.confirmList.length<1){
                                    layerMsg('暂无数据！')
                                    return false
                                }
                                $scope.pagination.totalItems=data.totalCount;
                                saveData();
                            },
                            error: function (e) {
                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        })
                    }
                }
            );
        };
        /**
         *重置
         */
        $scope.resetchQuery = function () {
            $scope.infoToView.dailyQuery = {};
            $scope.infoToView.dailyQuery.comcode=$scope.centerCode;
        };
        $scope.newresetchQuery = function () {
            $scope.infoToView.newdailyQuery = {}
            $scope.infoToView.newdailyQuery.comCode=$scope.centerCode;
        };
        $scope.setUpSave = function(){
            if($scope.infoToView.newdailyQuery.webUserCode == undefined){
                layer.msg("请录入设置类型");
            }else if($scope.infoToView.newdailyQuery.comCode == undefined){
                layer.msg("请选择机构/核算单位");
            }else if($scope.infoToView.newdailyQuery.webCenterComCode == undefined){
                layer.msg("请录入收付员");
            }else if($scope.infoToView.newdailyQuery.claimBatchNo == undefined){
                layer.msg("请选择日结时间");
            }else if($scope.infoToView.newdailyQuery.serialNo == undefined){
                layer.msg("请录入是否有效");
            }else{
                $$dailySetUpInvoice.payLossInfo($scope.infoToView.newdailyQuery,{
                    success: function (data) {
                        layer.msg(data.resultMsg, {icon: 1});
                        if(data.resultCode == '0000'){
                            $scope.infoToView.addFlag = false;
                            $scope.infoToView.newdailyQuery = {};
                        }
                    },
                    error: function (e) {
                    }
                },{
                    "pageNo": $scope.pagination.pageIndex,
                    "pageSize": $scope.pagination.pageSize
                })
            }
        }
        $scope.nowPlase = function (tage) {
            $scope.tage = tage;
            $$dailySetUpInvoice.immAutoDaily($scope.tage,{
                success: function (data) {
                    if(data.resultCode == '0000'){
                        layerMsg(data.resultMsg,'success')
                    }else{
                        layerMsg(data.resultMsg)
                        return false;
                    }
                },
                error: function (e) {
                }
            })
        }
        init();
        }
    moduleApp.controller('DailySetUpCtrl',['$scope','$$dailySetUpInvoice','$modal','FileUploader','$$venus','$timeout','mcMultiEditorCacheService',dailySetUpCondition])
})