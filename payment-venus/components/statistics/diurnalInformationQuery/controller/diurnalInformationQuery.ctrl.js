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
    var dailyQueryCondition=function($scope,$$dailyQueryInvoice,$modal,FileUploader,$$venus,$timeout,mcMultiEditorCacheService){
        /**
         * 初始化函数
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '10',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            $scope.pagination2=angular.copy($scope.pagination);
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$dailyQueryInvoice.Account().infoToView;
                $scope.infoToView.checkSheet.checkComCode = $scope.centerCode;
            }
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('dailyQuery',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('dailyQuery');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }
        $scope.payRefCodeFlag = true;
        $scope.myFunc = function(){
            if($scope.infoToView.checkSheet.type == '1'){
                $scope.payRefCodeFlag = false;
                $scope.infoToView.checkSheet.payRefCode = '00000000';
            }else if($scope.infoToView.checkSheet.type == '2'){
                $scope.payRefCodeFlag = true;
                $scope.infoToView.checkSheet.checkComCode = $scope.centerCode;
            }
        }
        $scope.getIndex=function (index) {
           $scope.indexClass=index;
        }
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
                        $scope.infoToView.checkSheet.webUserCode = $scope.usercode;
                        $scope.infoToView.checkSheet.webComCode = $scope.comCode;
                        $scope.infoToView.checkSheet.webCenterCode = $scope.centerCode;
                        $scope.infoToView.checkSheet.webTaskCode = 'payment.integrated.rijiequery';
                        if($scope.infoToView.checkSheet.type == undefined||$scope.infoToView.checkSheet.type == ''){
                            layer.msg("请录入业务标识");
                        }else if($scope.infoToView.checkSheet.payRefCode == undefined||$scope.infoToView.checkSheet.payRefCode == ''){
                            layer.msg("请录入收付员");
                        }else{
                            $$dailyQueryInvoice.collectionSearchs($scope.infoToView.checkSheet,{
                                success: function (data) {
                                    $scope.infoToView.confirmList=data.content.content;
                                    $scope.infoToView.vouconfirmList=[];
                                    $scope.pagination2.totalItems=0;
                                    if($scope.infoToView.confirmList.length<1){
                                        if(target=='noAlert'){
                                            layerMsg('暂无数据！')
                                        }
                                        return false
                                    }
                                    $scope.pagination.totalItems=data.content.totalCount;
                                    $scope.infoToView.voucherFlag = false;
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
                }
            );
        };
        //日结联动凭证信息查询
        $scope.tsettlementConfirmation = function(tagert,obj){
            if(obj){
                $scope.obj=obj;
            }
            if(tagert!='page'){
                $scope.pagination2.pageIndex=1;
            }
            $scope.infoToView.checkSheet.webUserCode = $scope.usercode;
            $scope.infoToView.checkSheet.webComCode = $scope.comCode;
            $scope.infoToView.checkSheet.webCenterCode = $scope.centerCode;
            $scope.infoToView.checkSheet.webTaskCode = 'payment.integrated.rijiequery';
            $$dailyQueryInvoice.queryAccMainvoucher($scope.infoToView.checkSheet,$scope.obj,{
                success: function (data) {
                    $scope.infoToView.vouconfirmList=data.content;
                    $scope.pagination2.totalItems=data.totalCount;
                    if($scope.infoToView.vouconfirmList.length<1){
                        layerMsg('暂无明细信息！')
                        return false
                    }
                    $scope.infoToView.voucherFlag = true;
                    saveData();
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.pagination2.pageIndex,
                "pageSize": $scope.pagination2.pageSize
            })
        }
        /**
         *重置
         */
        $scope.resetcheckSheet = function () {
            $scope.infoToView.checkSheet = {};
            $scope.infoToView.checkSheet.checkComCode = $scope.centerCode;
        };
        $scope.resertVoucher = function(){
            $scope.infoToView.voucherFlag = false;
        }
        /**
         * 凭证查询--清单查询
         */
        $scope.voucherList = function (target) {
            $modal.open({
                templateUrl: 'components/statistics/diurnalInformationQuery/tpl/modal/voucherReceivableList.modal.tpl.html',
                resolve: {
                    target:function () {
                        return target
                    },
                    pagination:function () {
                        return $scope.pagination
                    }
                },
                controller: function ($scope, $modalInstance,target,pagination) {
                    $scope.pagination=pagination;
                    $$dailyQueryInvoice.payLossInfo({
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
                    //查询业务信息
                    $scope.searchBus=function(obj){
                        $modal.open({
                            templateUrl: 'components/statistics/diurnalInformationQuery/tpl/modal/businessInfoList.modal.tpl.html',
                            resolve: {
                            },
                            controller: function ($scope, $modalInstance) {
                                $$dailyQueryInvoice.searchBus(obj,{
                                        success: function (data) {
                                            $scope.businessInfoList=data.content;
                                            if($scope.businessInfoList.length<1){
                                                layerMsg('暂无数据');
                                            }
                                        },
                                        error: function (e) {
                                        }
                                    }
                                );
                                $scope.cancel = function () {
                                    $modalInstance.dismiss();
                                };
                            }
                        });
                    };
                }
            });
        };
        init();
    }
    moduleApp.controller('DiurnalInformationQueryCtrl',['$scope','$$dailyQueryInvoice','$modal','FileUploader','$$venus','$timeout','mcMultiEditorCacheService',dailyQueryCondition])
})