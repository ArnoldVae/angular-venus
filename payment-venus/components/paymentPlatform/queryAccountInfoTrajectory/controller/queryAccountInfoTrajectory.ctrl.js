/**
 * 账户信息修改轨迹查询
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var queryAccountInfoTrajectoryCtrl=function($scope,$$queryAccountInfoTrajectory,$modal,mcMultiEditorCacheService){
        /**
         * 查询
         */
        $scope.searchTrajector = function (target) {
            if(target!='page'){
                $scope.accountInfoTrajectory.pagination.pageIndex=1;
            }
            $scope.accountInfoTrajectory.accountTrajectory.globalUserCode = $scope.usercode;
            $scope.accountInfoTrajectory.accountTrajectory.powerSystemCode = $scope.comCode;
            $$queryAccountInfoTrajectory.searchTrajector($scope.accountInfoTrajectory.accountTrajectory,{
                success: function (data) {
                    console.log(data);
                    $scope.accountInfoTrajectory.accountTrajectoryList = data.content.content;
                    if($scope.accountInfoTrajectory.accountTrajectoryList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.accountInfoTrajectory.pagination.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.accountInfoTrajectory.pagination.pageIndex-1,
                "pageSize": $scope.accountInfoTrajectory.pagination.pageSize
            })
        };
        /**
         * 重置
         */
        $scope.resetTrajector = function () {
            $scope.accountInfoTrajectory.accountTrajectory = {
                "globalUserCode":$scope.usercode,
                "powerSystemCode":$scope.comCode,
                "taskCode":"payment.unionpay.accounthisinfo"
            };
        };
        /**
         * 详细信息
         */
        $scope.detailedInfo = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/queryAccountInfoTrajectory/tpl/modal/detailedInfo.modal.html',
                resolve:{},
                controller:function ($scope,$modalInstance) {
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
                    $scope.init = function (data) {
                        if(data!='page'){
                            $scope.pagination.pageIndex=1;
                        }
                        $$queryAccountInfoTrajectory.queryTrajectorInfo(target,{
                            success: function (data) {
                                console.log(data);
                                $scope.trajectoryInfoList = data.content.content;
                                $scope.pagination.totalItems = data.content.totalCount;
                            },
                            error: function (e) {
                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex-1,
                            "pageSize": $scope.pagination.pageSize
                        });
                    };
                    $scope.init();
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
            var localDada=mcMultiEditorCacheService.localData('queryAccountInfoTrajectory');//获取上次数据
            if(localDada){
                $scope.accountInfoTrajectory=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('queryAccountInfoTrajectory',$scope.accountInfoTrajectory);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.accountInfoTrajectory = $$queryAccountInfoTrajectory.accountInfoTrajectory();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('queryAccountInfoTrajectoryCtrl',['$scope','$$queryAccountInfoTrajectory','$modal','mcMultiEditorCacheService',queryAccountInfoTrajectoryCtrl]);
});
