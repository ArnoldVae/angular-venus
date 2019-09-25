/**
 * 业务红冲信息控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var redFlushBusinessInfCtrl=function($scope,$$redFlushBusinessInf,$modal,$timeout,mcMultiEditorCacheService){
        /**
         * 查询
         */
        $scope.searchRedFlushInf=function (target) {
            if(target!='page'){
                $scope.redFlushInf.pagination.pageIndex=1;
            }
            if($scope.redFlushInf.businessInfo.voucherDateStart!=""&&$scope.redFlushInf.businessInfo.voucherDateEnd!=""&&$scope.redFlushInf.businessInfo.voucherDateStart>$scope.redFlushInf.businessInfo.voucherDateEnd){
                layerMsg("起始日期不能大于终止日期！");
                return false
            }
            $scope.redFlushInf.businessInfo.webUserCode = $scope.usercode;
            $scope.redFlushInf.businessInfo.webComCode = $scope.comCode;
            $scope.redFlushInf.businessInfo.webCenterCode = $scope.centerCode;
            $$redFlushBusinessInf.searchRedFlushInf($scope.redFlushInf.businessInfo, {
                success: function (data) {
                    $scope.redFlushInf.confirmList = data.content;
                    if(!target&&$scope.redFlushInf.confirmList.length == 0){
                        layerMsg("暂无数据！")
                    }
                    $scope.redFlushInf.pagination.totalItems = data.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.redFlushInf.pagination.pageIndex-1,
                "pageSize": $scope.redFlushInf.pagination.pageSize
            });
        };
        /**
         * 重置
         */
        $scope.resetRedFlushInf=function () {
            $scope.redFlushInf.businessInfo={}
        };
        /**
         * 勾选
         */
        $scope.changeOne = function (flag) {
            angular.forEach($scope.redFlushInf.confirmList, function (data,index) {
                if (flag == index) {
                    data.changeClass ='venus_table_check';
                }
                else {
                    data.changeClass = ''
                }
            });
        };
        /**
         * 确认红冲
         */
        $scope.confirmRedFlush = function () {
            $scope.confirmInfo={};
            angular.forEach($scope.redFlushInf.confirmList,function (data,index) {
                if(data.changeClass =="venus_table_check"){
                    $scope.confirmInfo = data
                }
            });
            if(!$scope.confirmInfo.realPayRefNo){
                layerMsg("请选择一条数据！");
                return false
            }
            $scope.confirmInfo.reverseType ="1";
            $scope.confirmInfo.webComCode =$scope.comCode;
            $scope.confirmInfo.webCenterCode =$scope.centerCode;
            $modal.open({
                templateUrl:"components/redFlush/redFlushBusinessInf/tpl/modal/reverseTypeCerti.modal.html",
                resolve:{
                    selectedInfo:function () {
                        return $scope.confirmInfo
                    },
                    user:function(){
                        return $scope.user
                    },
                },
                controller:function ($scope,$modalInstance,selectedInfo,user,$rootScope) {
                    var init =function () {
                        $$redFlushBusinessInf.confirmRedInf(selectedInfo, {
                            success: function (data) {
                                $scope.confirmRedFlushInf = data;
                            },
                            error: function (e) {
                            }
                        })
                    };
                    init();
                    //确认红冲
                    $scope.redFlushConfirm = function () {
                        $scope.confirmRedFlushInf.realPayRefNo=$scope.confirmRedFlushInf.strRealPayRefNo;
                        $scope.confirmRedFlushInf.reverseType="1";//红冲类型为业务红冲
                        $scope.confirmRedFlushInf.comCode=$rootScope.comCode;
                        $scope.confirmRedFlushInf.centerCode=user.centerCode;
                        $scope.confirmRedFlushInf.userCode=user.userCode;
                        $scope.confirmRedFlushInf.userName=user.userName;
                        $$redFlushBusinessInf.redFlushConfirm($scope.confirmRedFlushInf, {
                            success: function (data) {
                                if(data.content.resultCode=="0000"){
                                    layerMsg(data.content.resultMsg,'success');
                                    $modalInstance.close(data.content.resultMsg);
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result.then(function (result) {
                if(result){
                    $scope.searchRedFlushInf(true);
                }
            })
        };
        /**
         * 查看业务清单
         */
        $scope.lookCertiInfo = function (target) {
            $modal.open({
                templateUrl:"components/redFlush/redFlushBusinessInf/tpl/modal/certiNo.modal.html",
                resolve:{
                    target:function () {
                        return target
                    }
                },
                controller:function ($scope,$modalInstance,target) {
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
            var localDada=mcMultiEditorCacheService.localData('redFlushInfCondition');//获取上次数据
            if(localDada){
                $scope.redFlushInf=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('redFlushInfCondition',$scope.redFlushInf);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.redFlushInf = $$redFlushBusinessInf.redFlushInfCondition();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('redFlushBusinessInfCtrl',['$scope','$$redFlushBusinessInf','$modal','$timeout','mcMultiEditorCacheService',redFlushBusinessInfCtrl])
})  